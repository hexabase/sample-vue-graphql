<template>
  <div>
    <div v-for="movie in movies" :key="movie.id">{{movie.id}}</div>
  </div>
</template>

<script>
export default {
  name: "MoviesList",
  data() {
    return {
      movies: [
        {
          id: "123123123",
          title: "Harry Potter and the Order of the Phoenix",
          director: "David Yates",
          composer: "Nicholas Hopper",
          release_date: "2007-07-11"
        }
      ]
    };
  }
};
</script>