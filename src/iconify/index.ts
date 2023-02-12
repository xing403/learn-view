import { addCollection } from '@iconify/vue'
import { CreateEpIcon } from "./ep"
import { CreateIcIcon } from './ic'


export async function CreateIcons() {
    addCollection(await CreateIcIcon())
    addCollection(await CreateEpIcon())
}





