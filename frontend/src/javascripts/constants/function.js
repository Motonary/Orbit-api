//----------------------------------------------------------
// drop and drag fuction
//----------------------------------------------------------
function DragDropFunc() {
  //Draggable Planet
  const draggableTargets = document.getElementsByClassName('draggable-element')

  //Droppable Orbit
  const droppableOrbit = document.getElementsByClassName('common-circle')

  //Time to start
  draggableTargets.forEach(target => {
    target.addEventListener('dragstart', () => {}, false)
  })

  //During dragging
  draggableTargets.forEach(target => {
    target.addEventListener('drag', () => {}, false)
  })

  //Time to stop
  draggableTargets.forEach(target => {
    target.addEventListener('dragend', () => {}, false)
  })

  //Time to enter into Droppable area
  droppableOrbit.forEach(dropOrbit => {
    dropOrbit.addEventListener('dragenter', () => {}, false)
  })

  //Time to leave out from Drappable area
  droppableOrbit.forEach(dropOrbit => {
    dropOrbit.addEventListener('dragleave', () => {}, false)
  })

  //On Drappable area
  droppableOrbit.forEach(dropOrbit => {
    dropOrbit.addEventListener(
      'dragover',
      event => {
        //drop処理に必要
        event.preventDefault()
      },
      false
    )
  })

  //Time to drop on Droppable area
  droppableOrbit.forEach(dropOrbit => {
    dropOrbit.addEventListener('drop', () => {}, false)
  })
}

export default DragDropFunc
