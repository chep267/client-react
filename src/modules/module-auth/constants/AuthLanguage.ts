/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

export const AuthLanguage = {
    component: {
        button: {
            signIn: 'module.auth.component.button.signIn.text',
            register: 'module.auth.component.button.register.text',
            recover: 'module.auth.component.button.recover.text',
            clear: 'module.auth.component.button.clear.text',
        },
        label: {
            email: 'module.auth.component.label.email',
            password: 'module.auth.component.label.password',
            confirmPassword: 'module.auth.component.label.confirmPassword',
        },
        title: {
            signIn: 'module.auth.component.title.signIn',
            register: 'module.auth.component.title.register',
            recover: 'module.auth.component.title.recover',
            verifyOTP: 'module.auth.component.title.verifyOTP',
            signOut: 'module.auth.component.title.signOut',
        },
    },
    status: {
        email: {
            empty: 'module.auth.status.email.empty',
            invalid: 'module.auth.status.email.invalid',
        },
        password: {
            empty: 'module.auth.status.password.empty',
            invalid: 'module.auth.status.password.invalid',
            different: 'module.auth.status.password.different',
        },
    },
    notify: {
        server: {
            error: 'module.auth.notify.server.error',
        },
        refresh: {
            error: 'module.auth.notify.refresh.error',
        },
        signIn: {
            error: 'module.auth.notify.signIn.error',
        },
        register: {
            success: 'module.auth.notify.register.success',
            error: 'module.auth.notify.register.error',
        },
        recover: {
            success: 'module.auth.notify.recover.success',
            error: 'module.auth.notify.recover.error',
        },
    },
} as const;
