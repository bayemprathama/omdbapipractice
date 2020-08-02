// press enter to process
$('.input-keyword').on('keyup', function () {
  if (event.keyCode === 13) {
    event.preventDefault()
    $('.search-btn').click()
  }
})

// search btn on click
$('.search-btn').on('click', function () {
  $.ajax({
    url:
      'https://www.omdbapi.com/?apikey=5f131fc&s=' + $('.input-keyword').val(),
    success: (results) => {
      let cards = ''
      const movies = results.Search
      movies.forEach((movie) => {
        //adding cards template
        cards += showCards(movie)
      })
      // cards template added to html
      $('.movie-container').html(cards)
      //details btn on click
      $('.modal-detail-btn').on('click', function () {
        $.ajax({
          url:
            'https://www.omdbapi.com/?apikey=5f131fc&i=' +
            $(this).data('imdbid'),
          success: (res) => {
            //create modal template
            let movieDetailModal = showModal(res)
            //adding modal to html
            $('.modal-body').html(movieDetailModal)
          },
          error: (e) => {
            console.log(e.responseText)
          },
        })
      })
    },
    error: (e) => {
      console.log(e.responseText)
    },
  })
})

//cards template
function showCards(movie) {
  return `<div class="col-md-4 my-3">
            <div class="card">
              <img src="${movie.Poster}" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                <a href="#" class="btn btn-primary modal-detail-btn" data-toggle="modal"
                data-target="#movieDetailModal" data-imdbid="${movie.imdbID}">Show details</a>
              </div>
            </div>
          </div>`
}

//modal template
function showModal(res) {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <img src="${res.Poster}" class='img-fluid'>
              </div>
              <div class="col-md">
                <ul class="list-group">
                  <li class="list-group-item"><h4>${res.Title} ${res.Year}</h4></li>
                  <li class="list-group-item"><strong>Director : </strong>${res.Director}</li>
                  <li class="list-group-item"><strong>Actor :</strong>${res.Actors}</li>
                  <li class="list-group-item"><strong>Writer : </strong>${res.Writer}</li>
                  <li class="list-group-item"><strong>Plot : </strong>${res.Plot}</li>
                </ul>
              </div>
            </div>
          </div>`
}
