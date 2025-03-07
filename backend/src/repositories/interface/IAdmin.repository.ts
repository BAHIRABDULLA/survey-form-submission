import { IAdmin } from "../../models/admin.schema";
import { IBaseRepository } from "./IBase.repository";


export interface IAdminRepository extends IBaseRepository<IAdmin> {
    
}