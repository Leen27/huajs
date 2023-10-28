import { defineComponent } from 'vue'
import { computed, ref } from 'vue'
import Konva from 'konva'
import { type EventBus } from 'huajs-common'
import Repos from 'huajs-repo'

export default defineComponent({
  props: ['eventBus'],
  setup(props: {eventBus: EventBus}){

    const configKonva = ref({
      width: 1000,
      height: 1000
    })

    const entityRepo = Repos.Entity()
    const GraphicRepo = Repos.Graphic()
    GraphicRepo.save({})
    
    const nodes = computed(() => entityRepo.withAll().get())
    const stageRef = ref<Konva.Stage | null>(null)
    const stage = computed(() => stageRef.value?.getStage())

    const handleEntityDragEnd = (evt: Konva.KonvaPointerEvent, item: any) => {

      if (!stage.value) return
      const mousePos = stage.value.getPointerPosition()
      if (!mousePos) return

      if (item.position) {
        item.position.x = evt.target.x()
        item.position.y = evt.target.y()
      }

      props.eventBus.emit(evt.type, item)
    }

    const handleEntityDragMove = (evt: Konva.KonvaPointerEvent, item: any) => {
      if (!stage.value) return

      const mousePos = stage.value.getPointerPosition()
      if (!mousePos) return

      props.eventBus.emit(evt.type, item)
    }

    const handleLayerClick = (evt: Konva.KonvaPointerEvent) => {
      const target = evt.target

      const entityId = target.getAttr('entityId')
      if (!entityId) {
        GraphicRepo.save({
          id: GraphicRepo.query().first()?.id,
          selectedEntityId: ''
        })
        return
      }
        
      GraphicRepo.save({
        id: GraphicRepo.query().first()?.id,
        selectedEntityId: entityId
      })
    }

      return ()=>(
        <v-stage 
          config={configKonva.value}
          ref={stageRef}
          onClick={handleLayerClick}
          onDragstart={handleLayerClick}
        >
        <v-layer>
          {
            nodes.value.map(item => 
              item.shapeType === 'Circle' ? <v-circle
                config={
                { fill: 'red',
                  draggable: true,
                  x: item.position?.x,
                  y: item.position?.y,
                  radius: item.size?.radius,
                  entityId: item.id}
                }
                onDragmove={($event: any) => handleEntityDragMove($event, item)}
                onDragend={($event: any) => handleEntityDragEnd($event, item)}
              /> :
              <v-rect
                v-if={item.shapeType === 'Rect'}
                config={
                  {fill: 'red',
                  draggable: true,
                  x: item.position?.x,
                  y: item.position?.y,
                  width: item.size?.width,
                  height: item.size?.height,
                  entityId: item.id}
                }
                onDragmove={($event: any) => handleEntityDragMove($event, item)}
                onDragend={($event: any) => handleEntityDragEnd($event, item)}
              />
            )
          }
        </v-layer>
      </v-stage>
      )
    }
})