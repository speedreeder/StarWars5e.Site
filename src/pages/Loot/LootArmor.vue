<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import { EquipmentType, ArmorType, isArmorType } from '@/types/lootTypes'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'
  import LootArmorProperties from './LootArmorProperties.vue'
  import BackButton from '@/components/BackButton.vue'

  const equipmentModule = namespace('equipment')

  @Component({
    components: {
      SearchTable,
      BackButton,
      LootArmorProperties,
      VueMarkdown
    }
  })
  export default class LootArmor extends Vue {
    @equipmentModule.State equipment!: EquipmentType[]
    @equipmentModule.Action fetchEquipment!: () => void
    initialSearch: string | (string | null)[] = ''
    tableType: string = 'Armor'

    created () {
      this.fetchEquipment()
      this.initialSearch = this.$route.query.search
    }

    get items (): ArmorType[] {
      return _(this.equipment)
        .filter(isArmorType)
        .map(equipment => ({
          ...equipment,
          id: equipment.name,
          isExpandable: true
        })).value()
    }

    filterProperties (propertiesMap : { [property: string]: string }, filterValue: string[]) {
      var x = Object.keys(propertiesMap)
      var y = _.intersection(x, filterValue)

      return y.length
    }

    get properties () {
      return _(this.items).map(({ propertiesMap }) => (
          Object.keys(propertiesMap)
      )).flattenDeep().compact().sortBy().uniq().value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name', render: _.startCase },
        {
          text: 'Type',
          value: 'armorClassification',
          filterChoices: ['Light', 'Medium', 'Heavy', 'Shield'],
          filterFunction: ({ armorClassification }: ArmorType, filterValue: string) => armorClassification === filterValue
        },
        {
          text: 'Property',
          value: 'propertiesMap',
          isMultiSelect: true,
          render: (propertiesMap: { [property: string]: string }) => Object.values(propertiesMap).map((property) => _.upperFirst(property)).join(', '),
          filterChoices: this.properties,
          filterFunction: ({ propertiesMap }: ArmorType, filterValue: string[]) => this.filterProperties(propertiesMap, filterValue)
        },
        { text: 'Cost', value: 'cost' },
        { text: 'Weight', value: 'weight' },
        { text: 'AC', value: 'ac' },
        { text: 'Stealth', value: 'stealthDisadvantage', render: (isDisadvantage: boolean) => isDisadvantage ? 'Disadvantage' : '-' },
        {
          text: 'Source',
          value: 'contentSource',
          render: _.startCase,
          filterChoices: ['PHB', 'EC', 'WH'],
          filterFunction: ({ contentSource }: ArmorType, filterValue: string) => _.startCase(contentSource) === filterValue
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    BackButton
    h1 Armor
    br
    SearchTable(name="Armor", v-bind="{ headers, items, initialSearch, tableType }")
      template(v-slot:default="props")
        strong Properties:
        LootArmorProperties(:propertyList="props.item.properties")
        span(v-if="props.item.properties.length === 0")  None
        VueMarkdown(v-if="props.item.description", :source="props.item.description")
</template>
