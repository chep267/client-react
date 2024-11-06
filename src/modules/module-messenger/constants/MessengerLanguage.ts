/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

export const MessengerLanguage = {
    component: {
        label: {
            router: 'module.messenger.component.label.router',
            thread: 'module.messenger.component.label.thread',
            message: {
                option: 'module.messenger.component.label.message.option',
                you: 'module.messenger.component.label.message.you',
                sent: 'module.messenger.component.label.message.sent',
                count: {
                    image: {
                        single: 'module.messenger.component.label.message.count.image.single',
                        multi: 'module.messenger.component.label.message.count.image.multi',
                    },
                    video: {
                        single: 'module.messenger.component.label.message.count.video.single',
                        multi: 'module.messenger.component.label.message.count.video.multi',
                    },
                },
            },
        },
        button: {
            chooseFile: 'module.messenger.component.button.chooseFile',
            chooseEmoji: 'module.messenger.component.button.chooseEmoji',
            sendEmoji: 'module.messenger.component.button.sendEmoji',
            sendMessage: 'module.messenger.component.button.sendMessage',
        },
        select: {
            reply: 'module.messenger.component.select.reply',
            forward: 'module.messenger.component.select.forward',
            copy: 'module.messenger.component.select.copy',
            revoke: 'module.messenger.component.select.revoke',
            delete: 'module.messenger.component.select.delete',
        },
    },
} as const;
