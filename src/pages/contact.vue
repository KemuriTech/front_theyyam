<!-- pages/contact.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Contact Form Container -->
    <div class="max-w-xl mx-auto bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-2xl">
      <!-- Form Title and Subtitle -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Contact Kemuri</h1>
        <p class="text-gray-600">We'd love to hear from you. Please fill out the form below.</p>
      </div>

      <!-- Main Contact Form -->
      <form 
        ref="contactForm" 
        @submit.prevent="sendEmail" 
        class="space-y-6"
      >
        <!-- Name Field with Enhanced Validation -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2" for="name">
            Full Name <span class="text-red-500">*</span>
          </label>
          <input 
            id="name"
            v-model="formData.name"
            type="text" 
            name="user_name"
            required
            minlength="2"
            placeholder="Enter your full name"
            class="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
            :class="{
              'border-red-500': submitted && !formData.name,
              'border-green-500': formData.name.length >= 2
            }"
          />
          <transition name="fade">
            <p v-if="submitted && !formData.name" class="text-red-500 text-sm mt-1 animate-pulse">
              Please enter your full name
            </p>
          </transition>
        </div>

        <!-- Email Field with Advanced Validation -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2" for="email">
            Email Address <span class="text-red-500">*</span>
          </label>
          <input 
            id="email"
            v-model="formData.email"
            type="email" 
            name="user_email"
            required
            placeholder="you@example.com"
            class="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
            :class="{
              'border-red-500': submitted && !isValidEmail,
              'border-green-500': isValidEmail
            }"
          />
          <transition name="fade">
            <p v-if="submitted && !isValidEmail" class="text-red-500 text-sm mt-1 animate-pulse">
              Please enter a valid email address
            </p>
          </transition>
        </div>

        <!-- Purpose Dropdown with Conditional Rendering -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2" for="purpose">
            Purpose of Contact <span class="text-red-500">*</span>
          </label>
          <select 
            id="purpose"
            v-model="formData.purpose"
            name="purpose"
            required
            class="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
          >
            <option value="" disabled>Select Purpose</option>
            <option value="issue">Raise a Website Content Issue</option>
            <option value="contact">General Inquiry</option>
            <option value="support">Technical Support</option>
            <option value="partnership">Partnership Opportunity</option>
          </select>
        </div>

        <!-- Conditional Issue Description -->
        <transition name="slide-fade">
          <div v-if="formData.purpose === 'issue'" class="mt-4">
            <label class="block text-gray-700 font-semibold mb-2" for="issue_description">
              Describe the Issue <span class="text-red-500">*</span>
            </label>
            <textarea 
              id="issue_description"
              v-model="formData.issueDescription"
              name="issue_description"
              required
              placeholder="Provide details about the website content issue"
              class="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
              rows="4"
            ></textarea>
          </div>
        </transition>

        <!-- Contacting From Section for Issues -->
        <transition name="slide-fade">
          <div v-if="formData.purpose === 'issue'" class="space-y-4">
            <div>
              <label class="block text-gray-700 font-semibold mb-2">
                Contacting From <span class="text-red-500">*</span>
              </label>
              <div class="space-y-2">
                <label class="inline-flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    v-model="formData.contactingFrom" 
                    value="individual" 
                    name="contacting_from"
                    required
                    class="form-radio text-blue-500"
                  />
                  <span class="ml-2 text-gray-700">Individual User</span>
                </label>
                <label class="inline-flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    v-model="formData.contactingFrom" 
                    value="company" 
                    name="contacting_from"
                    required
                    class="form-radio text-blue-500"
                  />
                  <span class="ml-2 text-gray-700">Company Representative</span>
                </label>
              </div>
            </div>

            <!-- Company Name Field -->
            <transition name="slide-fade">
              <div v-if="formData.contactingFrom === 'company'" class="mt-4">
                <label class="block text-gray-700 font-semibold mb-2" for="company_name">
                  Company Name <span class="text-red-500">*</span>
                </label>
                <input 
                  id="company_name"
                  v-model="formData.companyName"
                  type="text" 
                  name="company_name"
                  required
                  placeholder="Enter your company name"
                  class="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
                />
              </div>
            </transition>
          </div>
        </transition>

        <!-- Message Field -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2" for="message">
            Your Message <span class="text-red-500">*</span>
          </label>
          <textarea 
            id="message"
            v-model="formData.message"
            name="message"
            required
            placeholder="Type your message here..."
            class="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
            rows="5"
            :class="{
              'border-red-500': submitted && !formData.message,
              'border-green-500': formData.message.length > 10
            }"
          ></textarea>
          <transition name="fade">
            <p v-if="submitted && !formData.message" class="text-red-500 text-sm mt-1 animate-pulse">
              Please enter a message
            </p>
          </transition>
        </div>

        <!-- Submit Button with Loading State -->
        <div>
          <button 
            type="submit" 
            :disabled="isSubmitting"
            class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-[1.01] flex items-center justify-center"
            :class="{'opacity-50 cursor-not-allowed': isSubmitting}"
          >
            <svg v-if="isSubmitting" class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>
        </div>
      </form>

      <!-- Success/Error Modal (can be replaced with a more sophisticated modal library) -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg shadow-xl text-center">
          <div class="mb-4">
            <svg v-if="modalType === 'success'" class="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <svg v-else class="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold mb-2">{{ modalTitle }}</h2>
          <p class="mb-4">{{ modalMessage }}</p>
          <button 
            @click="closeModal" 
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import emailjs from '@emailjs/browser'

// Refs for form management and state tracking
const contactForm = ref(null)
const submitted = ref(false)
const isSubmitting = ref(false)
const showModal = ref(false)
const modalType = ref('success')
const modalTitle = ref('')
const modalMessage = ref('')

// Reactive form data object
const formData = ref({
  name: '',
  email: '',
  purpose: '',
  issueDescription: '',
  contactingFrom: '',
  companyName: '',
  message: ''
})

// Email validation computed property
const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(formData.value.email)
})

// Modal management methods
const openModal = (type, title, message) => {
  modalType.value = type
  modalTitle.value = title
  modalMessage.value = message
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

// Email sending method with enhanced error handling
const sendEmail = async () => {
  // Reset submission state
  submitted.value = true

  // Comprehensive form validation
  const validationErrors = []
  if (!formData.value.name) validationErrors.push('Name is required')
  if (!isValidEmail.value) validationErrors.push('Valid email is required')
  if (!formData.value.purpose) validationErrors.push('Purpose must be selected')
  if (formData.value.purpose === 'issue' && !formData.value.contactingFrom) 
    validationErrors.push('Please specify if you are an individual or from a company')
  if (formData.value.purpose === 'issue' && formData.value.contactingFrom === 'company' && !formData.value.companyName)
    validationErrors.push('Company name is required')
  if (!formData.value.message) validationErrors.push('Message is required')

  // If validation fails, prevent submission
  if (validationErrors.length > 0) {
    openModal('error', 'Form Validation Failed', validationErrors.join(', '))
    return
  }

  // Begin submission process
  isSubmitting.value = true

  try {
    // Initialize EmailJS with your public key
    emailjs.init("cdXn5tlQGm9F5s8C1")

    // Prepare email parameters
    const emailParams = {
      user_name: formData.value.name,
      user_email: formData.value.email,
      purpose: getPurposeLabel(formData.value.purpose),
      issue_description: formData.value.issueDescription || 'N/A',
      contacting_from: getContactingFromLabel(formData.value),
      message: formData.value.message
    }

    // Send email using EmailJS
    const response = await emailjs.send(
      'service_yjwhgre', 
      'template_huh9zfe', 
      emailParams
    )

    // Success handling
    openModal('success', 'Message Sent', 'Your message has been successfully sent!')
    
    // Reset form
    resetForm()
  } catch (error) {
    // Error handling
    console.error('Email send failed:', error)
    openModal('error', 'Sending Failed', 'Unable to send message. Please try again later.')
  } finally {
    // Always reset submission state
    isSubmitting.value = false
  }
}

// Utility functions for label formatting
const getPurposeLabel = (purpose) => {
  const purposeLabels = {
    'issue': 'Website Content Issue',
    'contact': 'General Inquiry',
    'support': 'Technical Support',
    'partnership': 'Partnership Inquiry'
  }
  return purposeLabels[purpose] || 'Unspecified'
}

const getContactingFromLabel = (data) => {
  if (data.purpose !== 'issue') return 'N/A'
  return data.contactingFrom === 'individual' 
    ? 'Individual User' 
    : `Company (${data.companyName})`
}

// Form reset method
const resetForm = () => {
  submitted.value = false
  formData.value = {
    name: '',
    email: '',
    purpose: '',
    issueDescription: '',
    contactingFrom: '',
    companyName: '',
    message: ''
  }
}
</script>