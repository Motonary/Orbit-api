import * as React from 'react'
import { connect } from 'react-redux'
import anime from 'animejs'

import PlanetHolder from '../molecules/planet-holder'
import FooterButtonsList from '../molecules/footer-buttons-list'
import ConfirmModal from '../molecules/confirm-modal'
import FormModal from '../molecules/form-modal'

import {
  destroyAssignment,
  nullifySelectedAssignment,
} from '../../actions/assignments'
import {
  setSelectedStar,
  resetSelectedStar,
  resetDestroyPlanets,
} from '../../actions/common'

import { DeleteActions } from '../../constants/images'

import '../../../stylesheets/destroy_animate.scss'
import currentUser from '../../reducers/current-user';

interface FooterProps {
  currentUser: any,
  pathname: any,

  isDestroyIgnited: any,
  modalOpen: any,
  selectedAssignments: any,

  resetDestroyPlanets: any,
  nullifySelectedAssignment: any,
  destroyAssignment: any,
}

interface FooterState {
  clickedStar: any,
}

class Footer extends React.Component<FooterProps, FooterState> {
  constructor(props: FooterProps) {
    super(props)

    this.state = {
      clickedStar: null,
    }
  }

  componentDidMount() {
    let planet_list: any = document.getElementById('planet-list')
    planet_list.style.display = 'none'
  }

  componentDidUpdate(/*prevProps, prevState*/) {
    // TODO: 星破壊時の諸関数も最適化ししかるべきコンポーネントに移動する
    // 今後、発火のイベントとかも含めて再構築するので以下のネストのままで、一旦ペンディング
    if (this.props.isDestroyIgnited && !this.props.modalOpen) {
      if (this.props.selectedAssignments) {
        //console.log("didupdate")
        switch (this.props.isDestroyIgnited) {
          case 'Meteorite':
            this.onIgniteDestroyAnimation()
            break
          case 'Missile':
            this.onIgniteDestroyAnimation()
            break
          case 'BlackHole':
            this.onIginiteBlackHoleAnimation()
            break
          default:
            break
        }
      }
    }
  }

  waitFunc(sec: any): any {
    return function() {
      return new Promise(function(resolve) {
        setTimeout(resolve, sec * 1000)
      })
    }
  }

  onIginiteBlackHoleAnimation() {
    const targetIds: any = this.props.selectedAssignments
    const actionKey: any = this.props.isDestroyIgnited
    const targetDom: any = document.getElementById('project-orbit')
    const insertDom: any = document.getElementById('fixed-star')
    const displayDoms: any = []

    targetIds.forEach((id: any) => {
      displayDoms.push(document.getElementById(id).parentNode)
    })

    function withFadeOut(): any {
      displayDoms.forEach((displayDom: any) => {
        let removeTarget: any = displayDom.children[1]
        let blackholeDom: any = document.getElementById(displayDom.children[2].id)

        removeTarget.classList.add('blackhole-action')
        Promise.resolve()
          // .then(this.waitFunc(2.5))
          .then(() => {
            setTimeout(() => {
              blackholeDom.classList.add('blackhole-action')
            }, 2500)
          })
      })
    }

    function removeDoms(): any {
      displayDoms.forEach((displayDom: any) => {
        let removeTarget: any = displayDom
        displayDom.parentNode.removeChild(removeTarget)

        let blackholeDom: any = document.getElementById(displayDom.children[2].id)
        targetDom.removeChild(blackholeDom)
      })
    }

    displayDoms.forEach((displayDom: any) => {
      // 要素の位置座標を取得
      let clientRectTarget: any = displayDom.getBoundingClientRect()
      // 画面の左端から、要素の左端までの距離
      let xT: any = clientRectTarget.left
      // 画面の上端から、要素の上端までの距離
      let yT: any = clientRectTarget.top

      let newDiv: any = document.createElement('div')
      let newImg: any = document.createElement('img')
      newDiv.id = displayDom.children[2].id
      newDiv.classList.add('blackhole')
      newDiv.style.position = 'fixed'
      newDiv.style.left = `${xT}px`
      newDiv.style.top = `${yT}px`
      newDiv.style.zIndex = '-100'
      newImg.src = DeleteActions[actionKey]
      newDiv.appendChild(newImg)
      targetDom.insertBefore(newDiv, insertDom)
    })

    Promise.resolve()
      .then(withFadeOut())
      .then(this.waitFunc(3))
      .then(removeDoms())
  }

  onIgniteDestroyAnimation() {
    const targetDom: any = document.getElementById('project-orbit')
    const insertDom: any = document.getElementById('fixed-star')
    const actionKey: any = this.props.isDestroyIgnited
    let newDiv: any = document.createElement('div')
    let newImg: any = document.createElement('img')
    newDiv.classList.add('destroy-action')
    newImg.src = DeleteActions[actionKey]
    newDiv.appendChild(newImg)
    targetDom.insertBefore(newDiv, insertDom)
    this.makeMovement()
  }

  makeMovement() {
    const movDom: any = document.getElementsByClassName('destroy-action')[0]
    let targetDom: any
    if (this.props.selectedAssignments) {
      targetDom = document.getElementById(this.props.selectedAssignments[0])
    }

    // 要素の位置座標を取得.
    const clientRectMov: any = movDom.getBoundingClientRect()
    const clientRectTarget: any = targetDom.getBoundingClientRect()

    // 画面の左端から、要素の左端までの距離
    const xM: any = clientRectMov.left
    const xT: any = clientRectTarget.left
    // 画面の上端から、要素の上端までの距離
    const yM: any = clientRectMov.top
    const yT: any = clientRectTarget.top

    const disX: any = xT - xM
    const disY: any = yT - yM

    movDom.classList.add('move-animation')
    movDom.style.transform = `translateX(${disX}px) translateY(${disY}px)`

    //TODO: async/awaitで再実装
    Promise.resolve()
      .then(this.waitFunc(2.5))
      .then(() => {
        this.onClickDestroyPlanets(this.props.selectedAssignments)
      })
  }

  removePlanet(parent: any) {
    //FIXME: 一旦canvas以外のImgとballoonを削除・DOM上にはPlanetを表示する親要素は残る。
    parent.map((doc: any) => {
      let parent = doc
      let child = doc.firstChild
      parent.removeChild(child)
    })
  }

  removeAssignmentData(parent: any) {
    parent.map((doc: any) => {
      let cvs = doc.children[1]
      let cvs_info = cvs.id.split('-')
      this.props.destroyAssignment(cvs_info[0])
    })
  }

  onClickDestroyPlanets(selectedAssignments: any) {
    const target_ids: any = selectedAssignments

    var parent: any = []
    var canvasEl: any = []
    var ctx: any = []

    if (target_ids.length > 0) {
      target_ids.map((id: any) => {
        let tar: any = document.getElementById(id)
        parent.push(tar.parentNode)
        canvasEl.push(tar)
        ctx.push(tar.getContext('2d'))
      })
    }

    const numberOfParticules: any = 80
    //const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C']
    const colors: any = ['#FFF', '#FFF', '#FFF', '#FFF']

    var pointerX: any = 0
    var pointerY: any = 0

    //console.log(parent, canvasEl, ctx)

    function setCanvasSize() {
      let i: any = 0
      canvasEl.map((target: any) => {
        target.style.width = parent[i].parentNode.clientWidth + 'px'
        target.style.height = parent[i].parentNode.clientHeight + 'px'
        target.style.top = `-${parent[i].parentNode.clientWidth / 2}px`
        target.style.left = `-${parent[i].parentNode.clientHeight / 2}px`
        target.width = parent[i].parentNode.clientWidth
        target.height = parent[i].parentNode.clientHeight
        target.style.zIndex = 500
        target.getContext('2d').scale(2, 2)
        i++
      })
    }

    function updateCoords() {
      pointerX = 60
      pointerY = 60
    }

    function removeImg() {
      parent.map((doc: any) => {
        const child: any = doc.children[1]
        doc.removeChild(child)
      })
    }

    function removeDestroyImg() {
      const targetDom: any = document.getElementById('project-orbit')
      const movDom: any = document.getElementsByClassName('destroy-action')[0]

      targetDom.removeChild(movDom)
    }

    function setParticuleDirection(p: any) {
      var angle: any = (anime.random(0, 360) * Math.PI) / 180
      var value: any = anime.random(50, 180)
      var radius: any = [-1, 1][anime.random(0, 1)] * value
      return {
        x: p.x + radius * Math.cos(angle),
        y: p.y + radius * Math.sin(angle),
      }
    }

    function createParticule(x: any, y: any) {
      let p: any = {}
      p.x = x
      p.y = y
      p.color = colors[anime.random(0, colors.length - 1)]
      p.radius = anime.random(10, 20)
      p.endPos = setParticuleDirection(p)
      p.draw = function() {
        ctx.map((tar: any) => {
          tar.beginPath()
          tar.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
          tar.fillStyle = p.color
          tar.fill()
        })
      }
      return p
    }

    function renderParticule(anim: any) {
      for (let i = 0; i < anim.animatables.length; i++) {
        anim.animatables[i].target.draw()
      }
    }

    function animateParticules(x: any, y: any) {
      var particules: any = []
      for (let i = 0; i < numberOfParticules; i++) {
        particules.push(createParticule(x, y))
      }
      anime.timeline().add({
        targets: particules,
        x: function(p: any) {
          return p.endPos.x
        },
        y: function(p: any) {
          return p.endPos.y
        },
        radius: 0.1,
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule,
      })
    }

    var render: any = anime({
      targets: 'hoge', // tsでエラーが起きてしまう暫定的に追加
      duration: Infinity,
      update: function() {
        let i = 0
        ctx.map((val: any) => {
          val.clearRect(0, 0, canvasEl[i].width, canvasEl[i].height)
          i++
        })
      },
    })

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize, false)
    render.play()
    updateCoords()
    removeImg()
    removeDestroyImg()
    animateParticules(pointerX, pointerY)
    this.props.resetDestroyPlanets(null)
    this.removeAssignmentData(parent)
    this.removePlanet(parent)
    this.props.nullifySelectedAssignment()
    this.motionControll()
  }

  motionControll() {
    const target_classes = [
      document.getElementsByClassName('primo-orbit-motion'),
      document.getElementsByClassName('secundus-orbit-motion'),
      document.getElementsByClassName('tertius-orbit-motion'),
      document.getElementsByClassName('satelite-orbit-motion'),
    ]

    target_classes.map(target => {
      for (let i = 0; i < target.length; i++) {
        target[i].classList.toggle('pause-animation')
        target[i].classList.toggle('start-animation')
      }
    })
  }

  render() {
    const { currentUser, pathname }: any = this.props
    const rootPath = `/users/${currentUser.id}`

    return (
      <div id="footer">
        <PlanetHolder pathname={pathname} currentUser={currentUser} />
        <FooterButtonsList pathname={pathname} rootPath={rootPath} />
        <ConfirmModal />
        <FormModal pathname={pathname} />
      </div>
    )
  }
}

export default connect(
  ({
    selectedAssignments,
    selectedStar,
    isDestroyIgnited,
    modalOpen,
  }: any) => ({
    currentUser,
    selectedAssignments,
    isDestroyIgnited,
    selectedStar,
    modalOpen,
  }),
  {
    destroyAssignment,
    nullifySelectedAssignment,
    setSelectedStar,
    resetSelectedStar,
    resetDestroyPlanets,
  }
)(Footer)
