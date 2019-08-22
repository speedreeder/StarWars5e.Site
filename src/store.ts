import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'
import archetypes from './modules/archetypes'
import armor from './modules/armor'
import auth from './modules/auth'
import backgrounds from './modules/backgrounds'
import blobs from './modules/blobs'
import classes from './modules/classes'
import credits from './modules/credits'
import deployments from './modules/deployments'
import enhancedItems from './modules/enhancedItems'
import feats from './modules/feats'
import gear from './modules/gear'
import monsters from './modules/monsters'
import powers from './modules/powers'
import species from './modules/species'
import referenceTables from './modules/referenceTable'
import searchResults from './modules/searchResults'
import starshipEquipment from './modules/starshipEquipment'
import starshipModifications from './modules/starshipModifications'
import starshipSizes from './modules/starshipSizes'
import starshipWeapons from './modules/starshipWeapons'
import ui from './modules/ui'
import ventures from './modules/ventures'
import weapons from './modules/weapons'
import weaponProperties from './modules/weaponProperties'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    archetypes,
    armor,
    auth,
    backgrounds,
    blobs,
    classes,
    credits,
    deployments,
    enhancedItems,
    feats,
    gear,
    monsters,
    powers,
    species,
    referenceTables,
    searchResults,
    starshipEquipment,
    starshipModifications,
    starshipSizes,
    starshipWeapons,
    ui,
    ventures,
    weapons,
    weaponProperties
  }
})
