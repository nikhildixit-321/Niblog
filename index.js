 

const formTitle = document.querySelector(".title");
const discriPtion = document.querySelector(".discription");
const subTitle = document.querySelector(".subtitle");
const postBox = document.querySelector(".post-box");
const postData = document.querySelector(".data");
const postContainer = document.querySelector(".post-container");
let newBlogPost = [];

const getNewBlogLS = () => {
  return JSON.parse(localStorage.getItem("array")) || [];
};

const addNewBlogLocalStorage = (value) => {
  localStorage.setItem("array", JSON.stringify(value));
};

const deleteBlogPost = (index) => {
  
  newBlogPost = getNewBlogLS();
  newBlogPost.splice(index, 1); 
  addNewBlogLocalStorage(newBlogPost); 
  renderPosts(); 
};


const renderPosts = () => {
  postBox.innerHTML = ''; 
  newBlogPost = getNewBlogLS();
  newBlogPost.forEach((curBlog, index) => {
   
  
    const postDiv = document.createElement("div"); 
    const headOne = document.createElement("h2");
    const ktaHai = document.createElement("a");
    const spanTwo = document.createElement("span");
    const paraOne = document.createElement("p");
    const deleteButton = document.createElement("button");

    headOne.textContent = curBlog.title;
    ktaHai.textContent = curBlog.subtitle;
    spanTwo.textContent = curBlog.date;
    paraOne.textContent = curBlog.description;
    deleteButton.textContent = "Delete"; 
    deleteButton.classList.add("delete-btn"); 

   
    deleteButton.addEventListener("click", () => {
      deleteBlogPost(index); 
    });

 
    postBox.append(headOne, ktaHai, spanTwo, paraOne, deleteButton);
    postContainer.append(postDiv); 
  });
};


const addNewBlog = (e) => {
  e.preventDefault();

  const newPost = {
    title: formTitle.value.trim(),
    subtitle: subTitle.value.trim(),
    date: postData.value.trim(),
    description: discriPtion.value.trim(),
  };

  if (newPost.title && newPost.description) {
    newBlogPost = getNewBlogLS();
    newBlogPost.push(newPost);
    addNewBlogLocalStorage(newBlogPost);

    formTitle.value = "";
    subTitle.value = "";
    postData.value = "";
    discriPtion.value = "";

    renderPosts();
  }
};

renderPosts();
document.querySelector(".btn").addEventListener("click", addNewBlog);
