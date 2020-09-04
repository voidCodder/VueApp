<template>
  <form @submit.prevent="submit">
    <input
      type="email"
      placeholder="What's your email"
      :class="{ error: $v.email.$error }"
      v-model.trim="email"
      @blur="$v.email.$touch()"
    />
    <div v-if="$v.email.$error">
      <p class="errorMessage" v-if="!$v.email.email">
        Please enter a valid email address.
      </p>
      <p class="errorMessage" v-if="!$v.email.required">Email is required.</p>
    </div>
    <button type="submit" :disabled="$v.$invalid">Submit</button>
    <p v-if="$v.$anyError" class="errorMessage">
      Please fill out the required field(s).
    </p>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: null
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        console.log('Form Submission:', this.email)
      }
    }
  }
}
</script>
<style scoped></style>
