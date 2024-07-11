"use server"
import { Prisma, SocialLinks, User } from '@prisma/client'
//Business Logic Is here
import prisma from '../lib/db'
import { currentUser } from '@clerk/nextjs/server'


//It is the query to get all the plans so that we can show it in the frontend
//Starting of the business logic
export const getAllPlans = async () => {
    try {
        const response = await prisma.plan.findMany()


        return response

    } catch (e) {
        console.log(e)
    }
}



//Logic If user has entered the details or not?
//If user visit the website first time then store some important information.
export const getUserDetails = async () => {
    //get the logged in user?
    const user = await currentUser();

    if (!user) {
        return
    }

    const userData = await prisma.user.findUnique({
        where: {
            email: user.emailAddresses[0].emailAddress
        },
        include: {
            SocialLinks: true
        }
    })

    console.log(userData)


    //Returning the userData if found then you can get the userdata else null
    return userData;
}


//Logic to add the user in the database


type UserDataInput = {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    Address?: string;
    profileImage?: string;

};

type SocialLinksType = {
    link: string,
    id: string,
    platformName: string
}

export const setUserDetails = async (UserData: UserDataInput, SocialLinks: SocialLinksType[]) => {
    const user = await currentUser();

    if (!user || !user.emailAddresses[0]?.emailAddress) {
        throw new Error('Current user not found or email address is missing');
    }

    const userData = await prisma.user.upsert({
        where: {
            email: user.emailAddresses[0].emailAddress,
        },
        update: {
            firstName: UserData.firstName,
            lastName: UserData.lastName,
            phoneNumber: UserData.phoneNumber,
            Address: UserData.Address,
            profileImage: UserData.profileImage,
        },
        create: {
            email: user.emailAddresses[0].emailAddress,
            firstName: UserData.firstName,
            lastName: UserData.lastName,
            phoneNumber: UserData.phoneNumber,
            Address: UserData.Address,
            profileImage: UserData.profileImage,
        },
    });

    if (SocialLinks.length > 0) {

        SocialLinks.map(async (socialLink) => {

            await prisma.socialLinks.upsert({
                where: {
                    id: socialLink.id,
                },
                update: {
                    link: socialLink?.link || "",
                    platformName: socialLink?.platformName || ""
                },
                create: {
                    link: socialLink?.link || "",
                    platformName: socialLink?.platformName || "",
                    userId: userData.id,
                },
            })
        })
    }

    return userData;
};


//Set the user SocialLinks in the database 
export const deleteSocialLink = async (id: string) => {
    await prisma.socialLinks.deleteMany({
        where: {
            id: id
        }
    })
}

//Logic if user has subscription plans or not
//1. Subscription Plan
//2, Promo Codes 
