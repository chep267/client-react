/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

const RegexEmail = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/i;

const RegexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i;

const RegexPhone = /^(0[1-9][0-9]{7,14}|(?:\+?([1-9][0-9]{0,2})[ -]?)?[0-9]{7,14})$/;

const RegexName = /^(?!\s*$)[a-zA-ZÀ-Ưà-ư]+([ \s][a-zA-ZÀ-Ưà-ư]+|['-][a-zA-ZÀ-Ưà-ư]+)*\s*$/;

const RegexDate = /(^0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4}$)/;

export const Regex = {
    email: RegexEmail,
    password: RegexPassword,
    phone: RegexPhone,
    name: RegexName,
    date: RegexDate,
} as const;