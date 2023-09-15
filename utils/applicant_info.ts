import { faker } from "@faker-js/faker"

function randomString() {
    var length = 4;
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function randomNumber() {
    var lengthNumbers = 10;
    var Numbers = '1234567890';
    var resultedNumbers = '';
    for (var i = lengthNumbers; i > 0; --i) resultedNumbers += Numbers[Math.floor(Math.random() * Numbers.length)];
    return resultedNumbers;
}

export const applicant_info = {
    a_Name_String: randomString() + " " + randomString(),
    a_Name: faker.name.firstName() + " " + faker.name.lastName(),
    a_Phone: '5512536839',
    a_Email: 'tofiq.symits@gmail.com',
    a_Address: faker.address.direction(),
    a_Random_Note: faker.random.words(),
    a_Mailinator_Email: faker.random.alpha({ count: 8, casing: "lower" }) + "@mailinator.com",
    a_fullName: faker.name.fullName(),
    a_Phone_1: "+1" + randomNumber()
}