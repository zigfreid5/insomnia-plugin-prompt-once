module.exports.templateTags = [
    {
        name: 'promptOnce',
        displayName: 'Prompt-Once',
        description: 'Prompt for value only if not exists. Change at any time.',
        args: [
            {
                displayName: 'Key',
                help: 'Unique key for value lookup',
                type: 'string',
                validate: v => (v ? '' : 'Required'),
                placeholder: 'Key'
            },
            {
                displayName: 'Override Value (Does not save)',
                help: 'Override the stored value - use for quick changes.',
                type: 'string',
                placeholder: 'Override Value'
            },
            {
                displayName: 'Force prompt on next request',
                help: 'Prompt for new value on next request, regardless of existing stored value. Takes precedence over `Override Value`',
                type: 'boolean',
                defaultValue: false
            }
        ],
        async run (context, key, overrideValueString, forcePrompt) {
            if (!key) { throw new Error('Key is required'); }
            var isSendContext = context.renderPurpose === 'send';
            let storedValue = await context.store.getItem(key);
            let overrideValue = overrideValueString.length > 0 ? overrideValueString : null
            if (!isSendContext) {
                if (forcePrompt || !overrideValue && !storedValue) {
                    return 'Will prompt for value on next request';
                } else {
                    return overrideValue ? overrideValue : storedValue
                }
            } else {
                if (forcePrompt || overrideValue === null && storedValue === null) {
                    let input = await context.app.prompt('Enter value for ' + key + ' (ignores override value)', {
                        label: key,
                        defaultValue: storedValue || null,
                        cancelable: true,
                        submitName: 'Set Value'
                    });
                    if(input.length > 0) {
                        await context.store.setItem(key, input);
                        return input;
                    } else {
                        throw new Error('Value cannot be empty');
                    }
                } else {
                    return overrideValue ? overrideValue : storedValue;
                }
            }
        }
    }
];