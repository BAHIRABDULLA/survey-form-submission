import { Admin, IAdmin } from "../../models/admin.schema"
import { IAdminRepository } from "../interface/IAdmin.repository"
import { BaseRepository } from "./base.repository"


export class AdminRepository extends BaseRepository<IAdmin> implements IAdminRepository {
    constructor() {
        super(Admin)
    }

}