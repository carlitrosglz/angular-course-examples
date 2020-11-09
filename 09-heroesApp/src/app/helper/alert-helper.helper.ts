// npm i sweetalert2
import Swal, { SweetAlertResult } from 'sweetalert2';

export class AlertHelper {

    constructor() {}

    public fire(title: string, text: string, icon: string,
                allowOutsideClick?: boolean, showConfirmButton?: boolean,
                showCancelButton?: boolean): Promise<any> {


        return Swal.fire({
            title: `${title}`,
            text : `${text}`,
            showConfirmButton
        });
    }
}
