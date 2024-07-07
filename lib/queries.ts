"use server"
import { User } from '@prisma/client'
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
export const setUserDetails = async (UserData: Partial<User>) => {

    const user = await currentUser();

    const userData = await prisma.user.upsert({
        where: {
            email: user?.emailAddresses[0].emailAddress
        },
        update: UserData,
        //@ts-ignore
        create: UserData,

    })


    return userData;

}

//Logic if user has subscription plans or not
//1. Subscription Plan
//2, Promo Codes 
