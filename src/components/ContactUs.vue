<template>
    <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div class="relative">
            <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
                <div class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
            </div>
        </div>
        <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
            <p class="mt-2 text-lg leading-8 text-gray-600">Aute magna irure deserunt veniam aliqua magna enim voluptate.</p>
        </div>

        <div class="mx-auto max-w-xl sm:mt-20 lg:mt-10">
            <div v-for="message in formResponse.messages" v-if="formResponse.isResponse">
                <ui-alert :message="message" :type="formResponse.type" />
            </div>
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
                    <button type="submit" :class="`block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${formResponse.isProcessing?'animate-pulse':''}`" :disabled="formResponse.isProcessing">
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

            const { data, pending, error, refresh } = await useFetch('https://theyyam.g.kuroco.app/rcms-api/1/contact-us', {
                method: 'post',
                body: {
                name: this.form.name,
                email: this.form.email,
                body: this.form.message,
                },
            });

            let message = [];
            let type = '';

            if(error.value) {
                type = 'danger';

                if (error.value?.data?.errors)
                    message.push(...error.value.data.errors.map((e,i) => e.message));
                else
                    message.push('Something went wrong! Please try again...');

            } else {
                type = 'success';
                message = [_successMessage];
            }

            this.setResponse(type, message);
            this.formResponse.isProcessing = false;
        },
        setResponse(type, message) {
            this.formResponse.type = type;
            this.formResponse.messages = message;
            this.formResponse.isResponse = true;
        }
    },

}

</script>
