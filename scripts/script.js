
// finding profile's current information

const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const editButton = profileInfo.querySelector('.profile__edit-button');

// finding forms constants
const form = document.querySelector('.form');
const closeButton = form.querySelector('.form__close-button');
const submitButton = form.querySelector('.form__submit-button');


function OpenCloseForm(evt) {
    
    evt.preventDefault();

    // finding current information
    const profile = document.querySelector('.profile');
    const profileInfo = profile.querySelector('.profile__info');
    const profileName = profileInfo.querySelector('.profile__name');
    const profileAboutMe = profileInfo.querySelector('.profile__about-me');
    
    // getting inputs information
    const form = document.querySelector('.form');
    const inputName = form.querySelector('input[name="name"]');
    const inputAboutMe = form.querySelector('input[name="about-me"]');

    inputName.value = profileName.textContent;
    inputAboutMe.value = profileAboutMe.textContent;
    
    form.classList.toggle('form__active');
}

function handleProfileFormSubmit(evt) {
    
    evt.preventDefault();

    // finding current information
    const profile = document.querySelector('.profile');
    const profileInfo = profile.querySelector('.profile__info');
    const profileName = profileInfo.querySelector('.profile__name');
    const profileAboutMe = profileInfo.querySelector('.profile__about-me');
    
    // getting inputs information
    const form = document.querySelector('.form');
    const inputName = form.querySelector('input[name="name"]');
    const inputAboutMe = form.querySelector('input[name="about-me"]');

    profileName.textContent = inputName.value;
    profileAboutMe.textContent = inputAboutMe.value;

    form.classList.toggle('form__active');
}


// clicking buttons
editButton.addEventListener('click', OpenCloseForm);
closeButton.addEventListener('click', OpenCloseForm); 
submitButton.addEventListener('click', handleProfileFormSubmit);

// pressing enter
document.addEventListener('keyup', function(evt) {
    if (evt.key === 'Enter' && form.classList.contains('form__active')) {
        evt.preventDefault(); // Prevent to redirect to other webpage
        submitButton.click();
    }
  });