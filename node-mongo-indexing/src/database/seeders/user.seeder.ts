import faker from "faker";
import userModel from "../../models/users.model";

class UserSeeder {
    public userModel = userModel;

    seed = () => {
        let records = [];
        for(let i = 0; i <100000; i++) {
            
            const user = {
                firstName:faker.name.firstName(),
                lastName: faker.name.lastName(),
                email:faker.internet.email(),
                password: faker.internet.password()
            }
            console.log(`Created User Record ${i} ${user.email}`)
            records.push(user);
        }
        this.userModel.insertMany(records, (err, records) => {
            console.log({err})
        });
        console.log("inserted records " + records.length)
    }
}

export default UserSeeder