interface SocialContact {
    label: string;
    link: string;
}

interface ContactModel {

    // Primary Contact
    name?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;

    // Social Media Contact
    facebook?: SocialContact;
    instagram?: SocialContact;
    twitter?: SocialContact;
    linkedin?: SocialContact;
    github?: SocialContact;
    youtube?: SocialContact;

}

export default ContactModel;