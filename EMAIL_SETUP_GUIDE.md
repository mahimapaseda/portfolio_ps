# Contact Form Email Setup Guide

## Option 1: EmailJS Setup (Recommended - No Server Required)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Connect your Gmail account: `mahimapasedakusumsiri@gmail.com`
5. Note down your **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Template ID**: `template_contact_form`

**Subject**: `New Contact Form Message from {{from_name}}`

**Content**:
```
You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio website.
```

4. Save the template and note down the **Template ID**

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### Step 5: Update Your Code
Replace these placeholders in `script.js`:

```javascript
// Line 165: Replace 'YOUR_PUBLIC_KEY'
emailjs.init('YOUR_ACTUAL_PUBLIC_KEY');

// Line 211: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID'
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

### Example with real values:
```javascript
emailjs.init('user_abc123def456');
emailjs.send('service_xyz789', 'template_contact_form', templateParams)
```

## Option 2: Formspree (Alternative - No Server Required)

### Step 1: Create Formspree Account
1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for a free account
3. Verify your email: `mahimapasedakusumsiri@gmail.com`

### Step 2: Create New Form
1. Click "New Form"
2. Set form name: "Portfolio Contact Form"
3. Set email to: `mahimapasedakusumsiri@gmail.com`
4. Copy the form endpoint URL (e.g., `https://formspree.io/f/abc123`)

### Step 3: Update HTML Form
Replace the form in `index.html`:

```html
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <div class="form-group">
        <input type="text" id="name" name="name" placeholder="Your Name" required>
    </div>
    <div class="form-group">
        <input type="email" id="email" name="email" placeholder="Your Email" required>
    </div>
    <div class="form-group">
        <input type="text" id="subject" name="subject" placeholder="Subject" required>
    </div>
    <div class="form-group">
        <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>
    </div>
    <button type="submit" class="btn btn-primary" id="submit-btn">
        <span class="btn-text">Send Message</span>
        <span class="btn-loading" style="display: none;">
            <i class="fas fa-spinner fa-spin"></i> Sending...
        </span>
    </button>
</form>
```

### Step 4: Update JavaScript for Formspree
Replace the EmailJS code in `script.js` with:

```javascript
// Contact form handling for Formspree
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        submitBtn.disabled = true;

        // Submit to Formspree
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.log('Error:', error);
            showNotification('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
        })
        .finally(() => {
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        });
    });
}
```

## Option 3: Netlify Forms (If hosting on Netlify)

### Step 1: Add Netlify Attribute
Add `netlify` attribute to your form:

```html
<form id="contact-form" netlify name="contact">
    <!-- form fields remain the same -->
</form>
```

### Step 2: Add Hidden Field
Add this hidden field inside the form:

```html
<input type="hidden" name="form-name" value="contact">
```

### Step 3: Update JavaScript
Use the same Formspree JavaScript code but change the fetch URL to your Netlify form endpoint.

## Testing Your Setup

1. **Test the form**: Fill out and submit the contact form
2. **Check your email**: Look for the message in `mahimapasedakusumsiri@gmail.com`
3. **Check spam folder**: Sometimes emails go to spam initially
4. **Test error handling**: Try submitting with invalid data

## Troubleshooting

### Common Issues:
1. **Emails not received**: Check spam folder, verify email service setup
2. **Form not submitting**: Check browser console for JavaScript errors
3. **Validation errors**: Ensure all required fields are filled
4. **CORS errors**: Make sure you're using the correct service endpoints

### Debug Steps:
1. Open browser Developer Tools (F12)
2. Check Console tab for errors
3. Check Network tab to see if requests are being sent
4. Verify all IDs and keys are correct

## Security Notes

- **EmailJS**: Free tier allows 200 emails/month
- **Formspree**: Free tier allows 50 submissions/month
- **Rate limiting**: Both services have built-in spam protection
- **Validation**: Client-side validation is implemented, but server-side validation is handled by the services

## Next Steps

1. Choose your preferred option (EmailJS recommended)
2. Follow the setup steps
3. Update the code with your actual keys/IDs
4. Test the form thoroughly
5. Monitor your email for incoming messages

Your contact form will now actually send emails to `mahimapasedakusumsiri@gmail.com`!

