interface ContactFormModel {

    title: string;
    body?: string;
    buttonText?: string;

    requireName?: boolean;
    requireEmail?: boolean;
    requirePhone?: boolean;

    notesText?: string;
    requireNotes?: boolean;
}

export default ContactFormModel;