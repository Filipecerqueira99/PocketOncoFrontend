<template>
    <div>
        <p>Nothing found from this url</p>
    </div>
  </template>
  
  <script>
  /* eslint-disable */
  export default {
    name: "NotFound",
    data() {
        return {};
    },
    async created() {
        let userId = JSON.parse(localStorage.getItem("idUser"));
        console.log(userId)
        if (!userId) {
            this.$router.push("/login")
        } else {
          this.$router.push("/main2")
        }
    },
    methods: {
    },
};
  </script>
  
  