<template>
    <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <BgGradient />
        <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
            <p class="mt-2 text-lg leading-8 text-gray-600">Please fill the below details</p>
        </div>

        <div class="mx-auto max-w-xl sm:mt-20 lg:mt-10">
            <template v-if="formResponse.isResponse">
                <div v-for="(message, number) in formResponse.messages" :key="number">
                    <ui-alert :message="message" :type="formResponse.type" />
                </div>
            </template>
            <form v-if="(formResponse.isResponse && formResponse.type !== 'success') || formResponse.type === ''" class="" v-on:submit="submitHandler">
                <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label for="name" class="block text-sm font-semibold leading-6 text-gray-900">Name</label>
                        <div class="mt-2.5">
                            <input type="text" name="name" id="name" autocomplete="given-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="form.name"/>
                        </div>
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                        <div class="mt-2.5">
                            <input type="email" name="email" id="email" autocomplete="email" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required v-model="form.email"/>
                        </div>
                    </div>
                    <div class="sm:col-span-2">
                        <label for="message" class="block text-sm font-semibold leading-6 text-gray-900">Message</label>
                        <div class="mt-2.5">
                            <textarea name="message" id="message" rows="4" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="form.message" required/>
                        </div>
                    </div>
                </div>
                <div class="mt-10">
                    <button type="submit" :class="`block w-full rounded-md bg-secondary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${formResponse.isProcessing?'animate-pulse':''}`" :disabled="formResponse.isProcessing">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

const agreed = ref(false)

export default {
  name: 'ContactUs',
  setup() {
    const { $spi } = useNuxtApp();

    return {
      $spi
    }
  },
  data() {
    return {
      form: {
        name        : '',
        email       : '',
        message     : '',
      },
      formResponse: {
        isResponse  : false,
        type        : '',
        messages    : [],
        isProcessing : false,
      }
    }
  },
  methods: {
    async submitHandler(event) {
      event.preventDefault();

      this.formResponse.isProcessing = true;
      const _successMessage = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam beatae dolorem molestiae sunt suscipit tempore.";
      this.formResponse.isResponse = false;

      await this.$api.contact.post({
        name: this.form.name,
        email: this.form.email,
        body: this.form.message,
      })
        .then(async res => {
          let message = [];
          let type;

          if(!res.ok) {
            type = 'danger';
            await res.text().then(text =>  JSON.parse(text).errors.map(e=>message.push(e.message)));
          }
          else {
            type = 'success';
            message = [_successMessage];
          }
          this.setResponse(type, message)
        })
        .catch(err => {
          const message = [];
          message.push('Something went wrong! Please try again...');

          this.setResponse('danger', message)
        })
        .finally(res => {
          this.formResponse.isProcessing = false;
        });
    },
    setResponse(type, message) {
      this.formResponse.type = type;
      this.formResponse.messages = message;
      this.formResponse.isResponse = true;
    }
  },

}

</script>
