//use server
//Business Logic Is here
import prisma from '../lib/db'


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

