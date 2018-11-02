import keyMirror from 'keymirror'

//default user image
import ImgUser from '../images/main/user_default_icon.png'

//HeaderIcons
import ImgHistoryIcon from '../images/header/history_icon.png'
import ImgSettingIcon from '../images/header/setting_icon.png'
import ImgBackIcon from '../images/header/back_icon.png'

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

//planet checked images
import ImgStarChecked1 from '../images/planets_checked/star_1_check.png'
import ImgStarChecked2 from '../images/planets_checked/star_2_check.png'
import ImgStarChecked3 from '../images/planets_checked/star_3_check.png'
import ImgStarChecked4 from '../images/planets_checked/star_4_check.png'
import ImgStarChecked5 from '../images/planets_checked/star_5_check.png'
import ImgStarChecked6 from '../images/planets_checked/star_6_check.png'
import ImgStarChecked7 from '../images/planets_checked/star_7_check.png'
import ImgStarChecked8 from '../images/planets_checked/star_8_check.png'
import ImgStarChecked9 from '../images/planets_checked/star_9_check.png'
import ImgStarChecked10 from '../images/planets_checked/star_10_check.png'
import ImgStarChecked11 from '../images/planets_checked/star_11_check.png'
import ImgStarChecked12 from '../images/planets_checked/star_12_check.png'
import ImgStarChecked13 from '../images/planets_checked/star_13_check.png'
import ImgStarChecked14 from '../images/planets_checked/star_14_check.png'
import ImgStarChecked15 from '../images/planets_checked/star_15_check.png'

//delete icons
import DeleteIcon1 from '../images/footer/delete_btn_1.png'
import DeleteIcon2 from '../images/footer/delete_btn_2.png'
import DeleteIcon3 from '../images/footer/delete_btn_3.png'

//revival icons
import RevivalIcon from '../images/footer/revival_btn.png'

//delete action
import MeteoriteImg from '../images/main/metor.png'
import MissileImg from '../images/main/missile.png'
import BlackHoleImg from '../images/main/blackhole.png'

export const JWT = sessionStorage.getItem('jwt')

// TODO: developmentとproductionで場合分け
// export const ROOT_URL = 'http://localhost:3000'
export const ROOT_URL = 'https://orbit7.herokuapp.com'

export const actionTypes = keyMirror({
  // Common
  OPEN_MODAL: null,
  CLOSE_MODAL: null,

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
  RESTORE_ASSIGNMENT: null,
  SELECT_ASSIGNMENT: null,
  DISSELECT_ASSIGNMENT: null,
  NULLIFY_SELECTED_ASSIGNMENT: null
})

export const HeaderIcons = [ImgHistoryIcon, ImgSettingIcon, ImgBackIcon]

export const ImgDefaultUser = ImgUser

export const PlanetImgs = {
  Uranus: ImgStar1, Mercury: ImgStar2, Pluto: ImgStar3, Jupitar: ImgStar4, Earth: ImgStar5,
  Moon: ImgStar6, Love: ImgStar7, Mars: ImgStar8, Neputune: ImgStar9, Sirius: ImgStar10,
  Sun: ImgStar11, Venus: ImgStar12, Takoyaki: ImgStar13, Ball: ImgStar14, Egg: ImgStar15
}

export const PlanetCheckedImgs = {
  Uranus: ImgStarChecked1, Mercury: ImgStarChecked2, Pluto: ImgStarChecked3, Jupitar: ImgStarChecked4, Earth: ImgStarChecked5,
  Moon: ImgStarChecked6, Love: ImgStarChecked7, Mars: ImgStarChecked8, Neputune: ImgStarChecked9, Sirius: ImgStarChecked10,
  Sun: ImgStarChecked11, Venus: ImgStarChecked12, Takoyaki: ImgStarChecked13, Ball: ImgStarChecked14, Egg: ImgStarChecked15
}

export const DeleteIcons = [ DeleteIcon1, DeleteIcon2, DeleteIcon3 ]

export const RevivalImg = RevivalIcon

export const DeleteActions = { Meteorite: MeteoriteImg, Missile: MissileImg, BlackHole: BlackHoleImg }
