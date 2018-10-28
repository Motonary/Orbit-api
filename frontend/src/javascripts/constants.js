import keyMirror from 'keymirror'

//HeaderIcons
import ImgHistoryIcon from '../images/main/history_icon.png'
import ImgSettingIcon from '../images/main/setting_icon.png'
import ImgBackIcon from '../images/main/back_icon.png'

//default user image
import ImgUser from '../images/main/user_default_icon.png'

//planet images
import ImgStar1 from '../images/planets/star_1.png'
import ImgStar2 from '../images/planets/star_2.png'
import ImgStar3 from '../images/planets/star_3.png'
import ImgStar4 from '../images/planets/star_4.png'
import ImgStar5 from '../images/planets/star_5.png'
import ImgStar6 from '../images/planets/star_6.png'
import ImgStar7 from '../images/planets/star_7.png'
import ImgStar8 from '../images/planets/star_8.png'
import ImgStar9 from '../images/planets/star_9.png'
import ImgStar10 from '../images/planets/star_10.png'
import ImgStar11 from '../images/planets/star_11.png'
import ImgStar12 from '../images/planets/star_12.png'
import ImgStar13 from '../images/planets/star_13.png'
import ImgStar14 from '../images/planets/star_14.png'
import ImgStar15 from '../images/planets/star_15.png'

//delete icons
import DeleteIcon1 from '../images/main/delete_btn_1.png'
import DeleteIcon2 from '../images/main/delete_btn_2.png'
import DeleteIcon3 from '../images/main/delete_btn_3.png'


export const JWT = sessionStorage.getItem('jwt')

// TODO: developmentとproductionで場合分け
export const ROOT_URL = 'http://localhost:3000'

export const actionTypes = keyMirror({
  // User
  SET_CURRENT_USER: null,

  // Projects
  FETCH_ALL_PROJECTS: null,
  CREATE_PROJECT: null,
  DESTROY_PROJECT: null,

  // Assignments
  FETCH_REVOLVING_ASSIGNMENTS: null,
  FETCH_DESTROYED_ASSIGNMENTS: null,
  CREATE_ASSIGNMENT: null,
  DESTROY_ASSIGNMENT: null,
  RESTORE_ASSIGNMENT: null
})

export const HeaderIcons = [ImgHistoryIcon, ImgSettingIcon, ImgBackIcon]

export const ImgDefaultUser = ImgUser

export const PlanetImgs = [
  ImgStar1, ImgStar2, ImgStar3, ImgStar4, ImgStar5, ImgStar6, ImgStar7, ImgStar8,
  ImgStar9, ImgStar10, ImgStar11, ImgStar12, ImgStar13, ImgStar14, ImgStar15
]

export const DeleteIcons = [DeleteIcon1, DeleteIcon2, DeleteIcon3]
