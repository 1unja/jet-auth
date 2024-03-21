import { UserDtoType } from "../Types/user-dto-type"

class UserDto {
    email: string
    id: string
    isActivated: boolean
    
    constructor(model: UserDtoType){
        this.email = model.email
        this.id = model._id
        this.isActivated = model.isActivated
    }
}

export default UserDto
