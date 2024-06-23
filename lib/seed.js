import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//📌Below is the file to create the plans in database only uncomment if you want to create plans
// async function main() {
//     const plans = [
//         {
//             planName: 'Basic Plan',
//             planDuration: '1',
//             planDescription: 'Basic subscription plan for one month.',
//             planButton: 'Subscribe Now',
//             premiumPlan: false,
//         },
//         {
//             planName: 'Standard Plan',
//             planDuration: '6',
//             planDescription: 'Standard subscription plan for six months.',
//             planButton: 'Subscribe Now',
//             premiumPlan: false,
//         },
//         {
//             planName: 'Premium Plan',
//             planDuration: '12',
//             planDescription: 'Premium subscription plan for one year.',
//             planButton: 'Subscribe Now',
//             premiumPlan: true,
//         },
//     ];

//     for (const plan of plans) {
//         await prisma.plan.create({
//             data: plan,
//         });
//     }

//     console.log('Plans have been added to the database');
// }


//📌Below is the file to create the promo code in the database that will enter one row of promo code in the plan table
// async function main() {
//     const promoPlans = [
//         {
//             planName: 'Promo Plan',
//             planDuration: '1',
//             planDescription: 'Promo subscription plan free for one month.',
//             planButton: 'Use Promo Code',
//             premiumPlan: false,
//             promoCode: 'FREE1MONTH'
//         }
//     ];

//     for (const plan of promoPlans) {
//         await prisma.plan.create({
//             data: plan,
//         });
//     }

//     console.log('Promo plans have been added to the database');
// }




//📌 always uncomment below code snippet to create anything in database comment out after success to avoid any duplication in the database
// main()
//     .catch(e => {
//         console.error(e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });
