function getTimeString(time) {
    const hour = parseInt (time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hours ${minute} minute ${remainingSecond} seconds ago`;
}

const removeButtonClass = () => {
    const button = document.getElementsByClassName('category-btn');
    for(let btn of button) {
        btn.classList.remove('active');
    }
}
// create loadCatagories
const loadCatagories = () =>{
        fetch('https://openapi.programming-hero.com/api/phero-tube/categories ')
       .then(response => response.json())
       .then((data) => displayCategories(data.categories))
       .catch((error) => console.log(error));
}

// create loadVideos
const loadVideos = (searchText = "") =>{
    // fetch the data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
   .then(response => response.json())
   .then((data) => displayVideos(data.videos))
   .catch((error) => console.log(error));
}
   const loadCatagoriesVideos = (id) =>{
    //    alert(id);
       fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
       .then(response => response.json())
       .then((data) => {
        //remove the parameters called start
        removeButtonClass();
        //remove the parameters called end
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active");
        displayVideos(data.category);
       })
       .catch((error) => console.log(error))
   }

   const loadDetailsVideo =async (VideoId) =>{
      const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${VideoId}`;
      const response = await fetch(uri);
      const data = await response.json();
    //   console.log(data);
      displaydetails(data.video);
   };

   const displaydetails = (video) => {
        const detailsContainer = document.getElementById('modal-content')
        console.log(detailsContainer)
        detailsContainer.innerHTML = `
          <img src="${video.thumbnail}"/>
          <p>${video.description}</p>
        `;
        //way-1
        // document.getElementById("showModalData").click();
        //way-2
        document.getElementById("customModal").showModal();
   }
// const cardDemo = {
//     category_id: "1001",
//     video_id: "aaaa",
//     thumbnail: "https://i.ibb.co/L1b6xSq/shape.jpg",
//     title: "Shape of You",
//     authors: [{
//         profile_picture: "https://i.ibb.co/D9wWRM6/olivia.jpg",
//         profile_name: "Olivia Mitchell",
//         verified: true
//     }],
//     others: {
//         views: "100K",
//         posted_date: "16278" 
//     },
//     description: 
//     "Shape of You is a captivating track by Olivia Mitchell, blending pop sensibilities with vibrant beats. It has gained significant popularity, amassing 100K views since its release. The song features an infectious melody and heartfelt lyrics, making it perfect for fans seeking an uplifting musical experience."
// };
const displayVideos = (videos) =>{
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";  // clear the existing videos
    if(videos.length == 0){
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = `
           <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
                 <img src = "img/Icon.png"/>
                 <h1 class="text-xl text-center font-bold">No Content Here in this Catogory</h1>
           </div>
        `;
        return;
    }
    else{
        videoContainer.classList.add("grid")
    }
    videos.forEach((video) => {
        // create a new video element
        const card = document.createElement('div');
        card.classList = "card card-compact";
        card.innerHTML = `
  <figure class="h-[200px] relative">
    <img class="w-full h-full object-cover"
      src= ${video.thumbnail}
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0 ? "" : ` <span class="absolute text-xs bottom-2 right-2 bg-green-400 text-white rounded p-1">${getTimeString(video.others.posted_date)}</span>`
      }
  </figure>
  <div class="px-0 py-2">
      <div>
           <img class="w-10 h-10 rounded-full" src="${video.authors[0].profile_picture}" />
      </div>
      <div>
           <h2 class+"font-bold">${video.title}</h2>
           <div class="flex items-center gap-2">
                 <p class="text-gray-400">${video.authors[0].profile_name}</p>
                 ${video.authors[0].verified === true ? `<img class="w-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000">` : "false" }
           </div>
           <p><button onclick="loadDetailsVideo('${video.video_id}')" class="btn btn-sm btn-error">details</button></p>
           <p></p>
      </div>
  </div>
        `;
    videoContainer.append(card)
    });
};

// create Display categories
const displayCategories = (categories) =>{
    const catagoriesContainer = document.getElementById('catagories');
    categories.forEach((item) => {
        //create a new button
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCatagoriesVideos(${item.category_id})" class="btn category-btn">${item.category}</button>
        `
        catagoriesContainer.append(buttonContainer)
    });
}
   document.getElementById('search-input').addEventListener('keyup',(event) => {
       loadVideos(event.target.value);
   });
loadCatagories();
loadVideos();