const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const validateEmailsString = emails => {
	const invalidEmails = emails.split(',').map(email => email.trim()).filter(email => re.test(email) === false);

	if (invalidEmails.length && invalidEmails[invalidEmails.length - 1] !== '') {
		return `These emails are invalid: ${invalidEmails}`;
	}

	return;
};

export const validateEmail = email => {
	if (!re.test(email.trim())) {
		return `Email is invalid ${email}`;
	}
	return;
}
