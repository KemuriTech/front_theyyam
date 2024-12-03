<!-- pages/contact.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <form 
      ref="contactForm" 
      @submit.prevent="sendEmail" 
      class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md"
    >
      <!-- Name Field -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          Name <span class="text-red-500">*</span>
        </label>
        <input 
          id="name"
          v-model="formData.name"
          type="text" 
          name="user_name"
          required
          minlength="1"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{'border-red-500': submitted && !formData.name}"
        />
        <p v-if="submitted && !formData.name" class="text-red-500 text-sm mt-1">
          Name is required
        </p>
      </div>

      <!-- Email Field -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="email">
          Email <span class="text-red-500">*</span>
        </label>
        <input 
          id="email"
          v-model="formData.email"
          type="email" 
          name="user_email"
          required
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{'border-red-500': submitted && !isValidEmail}"
        />
        <p v-if="submitted && !isValidEmail" class="text-red-500 text-sm mt-1">
          Please enter a valid email address
        </p>
      </div>

      <!-- Purpose Field -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="purpose">
          Purpose <span class="text-red-500">*</span>
        </label>
        <select 
          id="purpose"
          v-model="formData.purpose"
          name="purpose"
          required
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Purpose</option>
          <option value="issue">Raise an Issue in Website Content</option>
          <option value="contact">Get in Touch with Kemuri</option>
        </select>
      </div>

      <!-- Conditional Issue Description (if purpose is issue) -->
      <div v-if="formData.purpose === 'issue'" class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="issue_description">
          Short Description of Issue
        </label>
        <textarea 
          id="issue_description"
          v-model="formData.issueDescription"
          name="issue_description"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        ></textarea>
      </div>

      <!-- Contacting From (if purpose is issue) -->
      <div v-if="formData.purpose === 'issue'" class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">
          Contacting From <span class="text-red-500">*</span>
        </label>
        <div class="space-y-2">
          <label class="inline-flex items-center">
            <input 
              type="radio" 
              v-model="formData.contactingFrom" 
              value="individual" 
              name="contacting_from"
              required
              class="form-radio"
            />
            <span class="ml-2">I am an individual and not part of any organization</span>
          </label>
          <label class="inline-flex items-center">
            <input 
              type="radio" 
              v-model="formData.contactingFrom" 
              value="company" 
              name="contacting_from"
              required
              class="form-radio"
            />
            <span class="ml-2">I am part of a company</span>
          </label>
        </div>
      </div>

      <!-- Company Name (if contacting from company) -->
      <div 
        v-if="formData.purpose === 'issue' && formData.contactingFrom === 'company'" 
        class="mb-4"
      >
        <label class="block text-gray-700 font-bold mb-2" for="company_name">
          Company Name <span class="text-red-500">*</span>
        </label>
        <input 
          id="company_name"
          v-model="formData.companyName"
          type="text" 
          name="company_name"
          required
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Message Field -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="message">
          Message <span class="text-red-500">*</span>
        </label>
        <textarea 
          id="message"
          v-model="formData.message"
          name="message"
          required
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          :class="{'border-red-500': submitted && !formData.message}"
        ></textarea>
        <p v-if="submitted && !formData.message" class="text-red-500 text-sm mt-1">
          Message is required
        </p>
      </div>

      <!-- Submit Button -->
      <div>
        <button 
          type="submit" 
          :disabled="isSubmitting"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          :class="{'opacity-50 cursor-not-allowed': isSubmitting}"
        >
          {{ isSubmitting ? 'Sending...' : 'Send Message' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import emailjs from '@emailjs/browser'

const contactForm = ref(null)
const submitted = ref(false)
const isSubmitting = ref(false)

const formData = ref({
  name: '',
  email: '',
  purpose: '',
  issueDescription: '',
  contactingFrom: '',
  companyName: '',
  message: ''
})

const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(formData.value.email)
})

const sendEmail = async () => {
  submitted.value = true

  // Validation
  if (!formData.value.name || 
      !isValidEmail.value || 
      !formData.value.purpose || 
      !formData.value.message ||
      (formData.value.purpose === 'issue' && !formData.value.contactingFrom) ||
      (formData.value.purpose === 'issue' && formData.value.contactingFrom === 'company' && !formData.value.companyName)
  ) {
    return
  }

  isSubmitting.value = true

  try {
    // Initialize EmailJS
    emailjs.init("cdXn5tlQGm9F5s8C1")

    // Send email
    const response = await emailjs.send(
      'service_yjwhgre', 
      'template_x1a55jn', 
      {
        user_name: formData.value.name,
        user_email: formData.value.email,
        purpose: formData.value.purpose === 'issue' ? 'Raising Website Issue' : 'Getting in Touch',
        issue_description: formData.value.issueDescription || 'N/A',
        contacting_from: formData.value.contactingFrom ? 
          (formData.value.contactingFrom === 'individual' ? 'Individual' : 
           `Company (${formData.value.companyName})`) : 'N/A',
        message: formData.value.message
      }
    )

    // Reset form and show success message
    console.log('Email sent!', response)
    submitted.value = false
    isSubmitting.value = false
    formData.value = {
      name: '',
      email: '',
      purpose: '',
      issueDescription: '',
      contactingFrom: '',
      companyName: '',
      message: ''
    }
    alert('Message sent successfully!')
  } catch (error) {
    console.error('Email send failed:', error)
    isSubmitting.value = false
    alert('Failed to send message. Please try again.')
  }
}
</script>