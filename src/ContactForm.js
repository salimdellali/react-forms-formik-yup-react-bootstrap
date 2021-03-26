// import React from 'react';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ContactForm = (props) => {
	// RegEx for phone number validation
	const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

	// Schema for yup
	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Names must have at least 2 characters')
			.max(100, "Names can't be longer than 100 characters")
			.required('Name is required'),
		email: Yup.string()
			.email('Must be a valid email address')
			.max(100, 'Email must be less than 100 characters')
			.required('Email is required'),
		phone: Yup.string()
			.matches(phoneRegExp, 'Phone number is not valid')
			.required('Phone number required'),
		blog: Yup.string()
			.url('Must enter URL in http://www.example.com format')
			.required('URL required'),
	});

	return (
		<Container className="my-5" bordered>
			<h1>React Forms using Formik - Yup and React-bootstrap</h1>
			<hr />
			<p>
				This is an example on how to use formik, yup and react-bootstrap all
				together with react, this form handles all edge cases of erros.
			</p>
			<p>
				Submitting this form won't actually send any information. It's going to
				display the information entered in an alert window after 1 second delay
				(to simulate real world form submission)
			</p>
			<hr />
			<Formik
				// Sets initial values for form inputs
				initialValues={{ name: '', email: '', phone: '', blog: '' }}
				// Hooks up our validationSchema to Formik
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					// When button submits from and form is in the process of submitting, submit button is disabled
					setSubmitting(true);
					// Simulate submitting to database, shows us values submitted, resets form
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						// Resets form after submission is complete
						resetForm();
						// Sets setSubmitting to false after from is reset
						setSubmitting(false);
					}, 1000);
				}}
			>
				{/* Callback function containing Formik state and helpers that handle common form actions */}
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="formName">
							<Form.Label>Name :</Form.Label>
							<Form.Control
								type="text"
								// This name property is used to access the value of the form element via values.nameOfElement
								name="name"
								placeholder="Full Name"
								// set onChange to handleChange
								onChange={handleChange}
								// set onBlud to handleBlur
								onBlur={handleBlur}
								// Store the value of this input in values.email, make sure this named the same as the name property on the form element
								value={values.name}
								isValid={touched.name && !errors.name}
								isInvalid={!!errors.name}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.name}
							</Form.Control.Feedback>
							<Form.Text muted>
								Your full name will be shared publicly
							</Form.Text>
						</Form.Group>
						<Form.Group controlId="formEmail">
							<Form.Label>Email :</Form.Label>
							<Form.Control
								type="text"
								name="email"
								placeholder="Email"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								isValid={touched.email && !errors.email}
								isInvalid={!!errors.email}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.email}
							</Form.Control.Feedback>
							<Form.Text muted>
								Your e-mail will be kept private and won't be shared
							</Form.Text>
						</Form.Group>
						<Form.Group controlId="formPhone">
							<Form.Label>Phone :</Form.Label>
							<Form.Control
								type="text"
								name="phone"
								placeholder="Phone"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.phone}
								isValid={touched.phone && !errors.phone}
								isInvalid={!!errors.phone}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.phone}
							</Form.Control.Feedback>
							<Form.Text muted>
								Your phone will be kept private and won't be shared
							</Form.Text>
						</Form.Group>
						<Form.Group controlId="formBlog">
							<Form.Label>Blog :</Form.Label>
							<Form.Control
								type="text"
								name="blog"
								placeholder="Blog URL"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.blog}
								isValid={touched.blog && !errors.blog}
								isInvalid={!!errors.blog}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.blog}
							</Form.Control.Feedback>
							<Form.Text muted>Your blog url will be shared publicly</Form.Text>
						</Form.Group>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? (
								<>
									<Spinner animation="border" size="sm" className="mr-2" />
									Submitting
								</>
							) : (
								'Submit'
							)}
						</Button>
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export default ContactForm;
