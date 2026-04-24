'use strict';

// ── Word list ─────────────────────────────────────────────────────────────
// Each entry: word = compound, first = starting part, second = ending part (becomes next bridge)
// Rules: real single-word compounds only, correct splits, no duplicates
const WORD_LIST = [
  // AIR
  { word:"airfield",   first:"air",    second:"field"  },
  { word:"airline",    first:"air",    second:"line"   },
  { word:"airlock",    first:"air",    second:"lock"   },
  { word:"airmail",    first:"air",    second:"mail"   },
  { word:"airport",    first:"air",    second:"port"   },
  { word:"airship",    first:"air",    second:"ship"   },
  { word:"airwave",    first:"air",    second:"wave"   },
  { word:"airway",     first:"air",    second:"way"    },
  // BACK
  { word:"backfire",   first:"back",   second:"fire"   },
  { word:"backhand",   first:"back",   second:"hand"   },
  { word:"backlash",   first:"back",   second:"lash"   },
  { word:"backlog",    first:"back",   second:"log"    },
  { word:"backpack",   first:"back",   second:"pack"   },
  { word:"backroad",   first:"back",   second:"road"   },
  { word:"backtrack",  first:"back",   second:"track"  },
  { word:"backbone",   first:"back",   second:"bone"   },
  { word:"backyard",   first:"back",   second:"yard"   },
  // BALL
  { word:"ballgame",   first:"ball",   second:"game"   },
  { word:"ballpark",   first:"ball",   second:"park"   },
  { word:"ballpoint",  first:"ball",   second:"point"  },
  { word:"ballroom",   first:"ball",   second:"room"   },
  // BED
  { word:"bedpost",    first:"bed",    second:"post"   },
  { word:"bedrock",    first:"bed",    second:"rock"   },
  { word:"bedroom",    first:"bed",    second:"room"   },
  { word:"bedside",    first:"bed",    second:"side"   },
  { word:"bedtime",    first:"bed",    second:"time"   },
  // BIRD
  { word:"birdcage",   first:"bird",   second:"cage"   },
  { word:"birdhouse",  first:"bird",   second:"house"  },
  { word:"birdseed",   first:"bird",   second:"seed"   },
  { word:"birdsong",   first:"bird",   second:"song"   },
  { word:"birdwatch",  first:"bird",   second:"watch"  },
  // BIRTH
  { word:"birthday",   first:"birth",  second:"day"    },
  { word:"birthmark",  first:"birth",  second:"mark"   },
  { word:"birthplace", first:"birth",  second:"place"  },
  { word:"birthstone", first:"birth",  second:"stone"  },
  // BLACK
  { word:"blackberry", first:"black",  second:"berry"  },
  { word:"blackbird",  first:"black",  second:"bird"   },
  { word:"blackboard", first:"black",  second:"board"  },
  { word:"blackfish",  first:"black",  second:"fish"   },
  { word:"blackout",   first:"black",  second:"out"    },
  { word:"blacksmith", first:"black",  second:"smith"  },
  // BLUE
  { word:"bluebell",   first:"blue",   second:"bell"   },
  { word:"blueberry",  first:"blue",   second:"berry"  },
  { word:"bluebird",   first:"blue",   second:"bird"   },
  { word:"blueprint",  first:"blue",   second:"print"  },
  // BOARD
  { word:"boardgame",  first:"board",  second:"game"   },
  { word:"boardroom",  first:"board",  second:"room"   },
  { word:"boardwalk",  first:"board",  second:"walk"   },
  // BOOK
  { word:"bookcase",   first:"book",   second:"case"   },
  { word:"bookend",    first:"book",   second:"end"    },
  { word:"bookshelf",  first:"book",   second:"shelf"  },
  { word:"bookstore",  first:"book",   second:"store"  },
  { word:"bookworm",   first:"book",   second:"worm"   },
  // BRAIN
  { word:"brainchild", first:"brain",  second:"child"  },
  { word:"brainstorm", first:"brain",  second:"storm"  },
  { word:"brainwash",  first:"brain",  second:"wash"   },
  { word:"brainwave",  first:"brain",  second:"wave"   },
  // BREAK
  { word:"breakdown",  first:"break",  second:"down"   },
  { word:"breakout",   first:"break",  second:"out"    },
  { word:"breakthrough",first:"break", second:"through"},
  { word:"breakwater", first:"break",  second:"water"  },
  // BURN
  { word:"burnout",    first:"burn",   second:"out"    },
  // CARD
  { word:"cardboard",  first:"card",   second:"board"  },
  // CLASS
  { word:"classmate",  first:"class",  second:"mate"   },
  { word:"classroom",  first:"class",  second:"room"   },
  // CLOCK
  { word:"clocktower", first:"clock",  second:"tower"  },
  { word:"clockwork",  first:"clock",  second:"work"   },
  // CROSS
  { word:"crossbow",   first:"cross",  second:"bow"    },
  { word:"crossfire",  first:"cross",  second:"fire"   },
  { word:"crossroad",  first:"cross",  second:"road"   },
  { word:"crosswalk",  first:"cross",  second:"walk"   },
  { word:"crosswind",  first:"cross",  second:"wind"   },
  { word:"crossword",  first:"cross",  second:"word"   },
  // DAY
  { word:"daybreak",   first:"day",    second:"break"  },
  { word:"daydream",   first:"day",    second:"dream"  },
  { word:"daylight",   first:"day",    second:"light"  },
  { word:"daytime",    first:"day",    second:"time"   },
  // DOG
  { word:"dogfish",    first:"dog",    second:"fish"   },
  { word:"doghouse",   first:"dog",    second:"house"  },
  { word:"dogwood",    first:"dog",    second:"wood"   },
  // DOOR
  { word:"doorbell",   first:"door",   second:"bell"   },
  { word:"doorknob",   first:"door",   second:"knob"   },
  { word:"doormat",    first:"door",   second:"mat"    },
  { word:"doorstep",   first:"door",   second:"step"   },
  { word:"doorway",    first:"door",   second:"way"    },
  // DOWN
  { word:"download",   first:"down",   second:"load"   },
  { word:"downfall",   first:"down",   second:"fall"   },
  { word:"downhill",   first:"down",   second:"hill"   },
  { word:"downpour",   first:"down",   second:"pour"   },
  { word:"downside",   first:"down",   second:"side"   },
  { word:"downtime",   first:"down",   second:"time"   },
  { word:"downtown",   first:"down",   second:"town"   },
  // DREAM
  { word:"dreamland",  first:"dream",  second:"land"   },
  // DRIFT
  { word:"driftwood",  first:"drift",  second:"wood"   },
  // DRUM
  { word:"drumbeat",   first:"drum",   second:"beat"   },
  { word:"drumroll",   first:"drum",   second:"roll"   },
  { word:"drumstick",  first:"drum",   second:"stick"  },
  // DUST
  { word:"dustbin",    first:"dust",   second:"bin"    },
  { word:"dustpan",    first:"dust",   second:"pan"    },
  { word:"duststorm",  first:"dust",   second:"storm"  },
  // EYE
  { word:"eyeball",    first:"eye",    second:"ball"   },
  { word:"eyebrow",    first:"eye",    second:"brow"   },
  { word:"eyelash",    first:"eye",    second:"lash"   },
  { word:"eyelid",     first:"eye",    second:"lid"    },
  { word:"eyesight",   first:"eye",    second:"sight"  },
  // FALL
  { word:"fallback",   first:"fall",   second:"back"   },
  { word:"fallout",    first:"fall",   second:"out"    },
  // FARM
  { word:"farmhand",   first:"farm",   second:"hand"   },
  { word:"farmhouse",  first:"farm",   second:"house"  },
  { word:"farmland",   first:"farm",   second:"land"   },
  { word:"farmyard",   first:"farm",   second:"yard"   },
  // FIELD
  { word:"fieldwork",  first:"field",  second:"work"   },
  // FIRE
  { word:"fireball",   first:"fire",   second:"ball"   },
  { word:"firefly",    first:"fire",   second:"fly"    },
  { word:"firehouse",  first:"fire",   second:"house"  },
  { word:"fireplace",  first:"fire",   second:"place"  },
  { word:"fireside",   first:"fire",   second:"side"   },
  { word:"firestorm",  first:"fire",   second:"storm"  },
  { word:"firewood",   first:"fire",   second:"wood"   },
  { word:"firework",   first:"fire",   second:"work"   },
  // FISH
  { word:"fishbowl",   first:"fish",   second:"bowl"   },
  { word:"fishcake",   first:"fish",   second:"cake"   },
  { word:"fishnet",    first:"fish",   second:"net"    },
  { word:"fishpond",   first:"fish",   second:"pond"   },
  { word:"fishtail",   first:"fish",   second:"tail"   },
  // FLY
  { word:"flyover",    first:"fly",    second:"over"   },
  { word:"flywheel",   first:"fly",    second:"wheel"  },
  // FLOWER
  { word:"flowerbed",  first:"flower", second:"bed"    },
  { word:"flowerpot",  first:"flower", second:"pot"    },
  // FOOT
  { word:"football",   first:"foot",   second:"ball"   },
  { word:"footfall",   first:"foot",   second:"fall"   },
  { word:"foothold",   first:"foot",   second:"hold"   },
  { word:"footnote",   first:"foot",   second:"note"   },
  { word:"footpath",   first:"foot",   second:"path"   },
  { word:"footprint",  first:"foot",   second:"print"  },
  { word:"footstep",   first:"foot",   second:"step"   },
  { word:"footwear",   first:"foot",   second:"wear"   },
  // GATE
  { word:"gatehouse",  first:"gate",   second:"house"  },
  { word:"gatekeeper", first:"gate",   second:"keeper" },
  { word:"gateway",    first:"gate",   second:"way"    },
  // GOLD
  { word:"goldfinch",  first:"gold",   second:"finch"  },
  { word:"goldfish",   first:"gold",   second:"fish"   },
  { word:"goldmine",   first:"gold",   second:"mine"   },
  { word:"goldsmith",  first:"gold",   second:"smith"  },
  // GROUND
  { word:"groundhog",  first:"ground", second:"hog"    },
  { word:"groundwater",first:"ground", second:"water"  },
  { word:"groundwork", first:"ground", second:"work"   },
  // HAND
  { word:"handbook",   first:"hand",   second:"book"   },
  { word:"handhold",   first:"hand",   second:"hold"   },
  { word:"handmade",   first:"hand",   second:"made"   },
  { word:"handout",    first:"hand",   second:"out"    },
  { word:"handrail",   first:"hand",   second:"rail"   },
  { word:"handshake",  first:"hand",   second:"shake"  },
  { word:"handwork",   first:"hand",   second:"work"   },
  // HEART
  { word:"heartbeat",  first:"heart",  second:"beat"   },
  { word:"heartbreak", first:"heart",  second:"break"  },
  { word:"heartburn",  first:"heart",  second:"burn"   },
  { word:"heartfelt",  first:"heart",  second:"felt"   },
  { word:"heartland",  first:"heart",  second:"land"   },
  // HEAT
  { word:"heatstroke", first:"heat",   second:"stroke" },
  { word:"heatwave",   first:"heat",   second:"wave"   },
  // HILL
  { word:"hillside",   first:"hill",   second:"side"   },
  { word:"hilltop",    first:"hill",   second:"top"    },
  // HOME
  { word:"homeland",   first:"home",   second:"land"   },
  { word:"homeroom",   first:"home",   second:"room"   },
  { word:"homework",   first:"home",   second:"work"   },
  { word:"hometown",   first:"home",   second:"town"   },
  // HORSE
  { word:"horseback",  first:"horse",  second:"back"   },
  { word:"horsefly",   first:"horse",  second:"fly"    },
  { word:"horseplay",  first:"horse",  second:"play"   },
  { word:"horsepower", first:"horse",  second:"power"  },
  { word:"horseshoe",  first:"horse",  second:"shoe"   },
  // HOUSE
  { word:"housefly",   first:"house",  second:"fly"    },
  { word:"household",  first:"house",  second:"hold"   },
  { word:"housemate",  first:"house",  second:"mate"   },
  { word:"houseplant", first:"house",  second:"plant"  },
  { word:"housetop",   first:"house",  second:"top"    },
  { word:"housework",  first:"house",  second:"work"   },
  // KEY
  { word:"keychain",   first:"key",    second:"chain"  },
  { word:"keyhole",    first:"key",    second:"hole"   },
  { word:"keyboard",   first:"key",    second:"board"  },
  { word:"keynote",    first:"key",    second:"note"   },
  { word:"keypad",     first:"key",    second:"pad"    },
  { word:"keystone",   first:"key",    second:"stone"  },
  // LAND
  { word:"landfall",   first:"land",   second:"fall"   },
  { word:"landfill",   first:"land",   second:"fill"   },
  { word:"landmark",   first:"land",   second:"mark"   },
  { word:"landmine",   first:"land",   second:"mine"   },
  { word:"landscape",  first:"land",   second:"scape"  },
  { word:"landlord",   first:"land",   second:"lord"   },
  { word:"landslide",  first:"land",   second:"slide"  },
  // LIFE
  { word:"lifeline",   first:"life",   second:"line"   },
  { word:"lifespan",   first:"life",   second:"span"   },
  { word:"lifestyle",  first:"life",   second:"style"  },
  { word:"lifetime",   first:"life",   second:"time"   },
  // LIGHT
  { word:"lightbulb",  first:"light",  second:"bulb"   },
  { word:"lighthouse", first:"light",  second:"house"  },
  { word:"lightweight",first:"light",  second:"weight" },
  { word:"lightyear",  first:"light",  second:"year"   },
  // LOCK
  { word:"lockbox",    first:"lock",   second:"box"    },
  { word:"lockdown",   first:"lock",   second:"down"   },
  { word:"lockout",    first:"lock",   second:"out"    },
  { word:"locksmith",  first:"lock",   second:"smith"  },
  // LOG
  { word:"logbook",    first:"log",    second:"book"   },
  // MARK
  { word:"markdown",   first:"mark",   second:"down"   },
  // MID
  { word:"midday",     first:"mid",    second:"day"    },
  { word:"midnight",   first:"mid",    second:"night"  },
  { word:"midtown",    first:"mid",    second:"town"   },
  { word:"midway",     first:"mid",    second:"way"    },
  // MILL
  { word:"millpond",   first:"mill",   second:"pond"   },
  { word:"millstone",  first:"mill",   second:"stone"  },
  { word:"millwork",   first:"mill",   second:"work"   },
  // MINE
  { word:"minefield",  first:"mine",   second:"field"  },
  { word:"mineshaft",  first:"mine",   second:"shaft"  },
  // NEWS
  { word:"newsletter", first:"news",   second:"letter" },
  { word:"newspaper",  first:"news",   second:"paper"  },
  { word:"newsprint",  first:"news",   second:"print"  },
  { word:"newsroom",   first:"news",   second:"room"   },
  // NIGHT
  { word:"nightclub",  first:"night",  second:"club"   },
  { word:"nightfall",  first:"night",  second:"fall"   },
  { word:"nightlife",  first:"night",  second:"life"   },
  { word:"nightmare",  first:"night",  second:"mare"   },
  { word:"nightstand", first:"night",  second:"stand"  },
  { word:"nighttime",  first:"night",  second:"time"   },
  // NOTE
  { word:"notepad",    first:"note",   second:"pad"    },
  { word:"notebook",   first:"note",   second:"book"   },
  // OUT
  { word:"outback",    first:"out",    second:"back"   },
  { word:"outbox",     first:"out",    second:"box"    },
  { word:"outfield",   first:"out",    second:"field"  },
  { word:"outpost",    first:"out",    second:"post"   },
  { word:"outwork",    first:"out",    second:"work"   },
  // OVER
  { word:"overboard",  first:"over",   second:"board"  },
  { word:"overflow",   first:"over",   second:"flow"   },
  { word:"overlook",   first:"over",   second:"look"   },
  { word:"overload",   first:"over",   second:"load"   },
  { word:"overpass",   first:"over",   second:"pass"   },
  { word:"overtime",   first:"over",   second:"time"   },
  { word:"overwork",   first:"over",   second:"work"   },
  // PAD
  { word:"padlock",    first:"pad",    second:"lock"   },
  // PAPER
  { word:"paperback",  first:"paper",  second:"back"   },
  { word:"paperboy",   first:"paper",  second:"boy"    },
  { word:"paperclip",  first:"paper",  second:"clip"   },
  { word:"paperweight",first:"paper",  second:"weight" },
  { word:"paperwork",  first:"paper",  second:"work"   },
  // PASS
  { word:"passbook",   first:"pass",   second:"book"   },
  { word:"password",   first:"pass",   second:"word"   },
  // PATH
  { word:"pathway",    first:"path",   second:"way"    },
  // PIN
  { word:"pinball",    first:"pin",    second:"ball"   },
  { word:"pinhole",    first:"pin",    second:"hole"   },
  { word:"pinpoint",   first:"pin",    second:"point"  },
  // PLAY
  { word:"playbook",   first:"play",   second:"book"   },
  { word:"playhouse",  first:"play",   second:"house"  },
  { word:"playmate",   first:"play",   second:"mate"   },
  { word:"playoff",    first:"play",   second:"off"    },
  { word:"playroom",   first:"play",   second:"room"   },
  { word:"playtime",   first:"play",   second:"time"   },
  // PORT
  { word:"porthole",   first:"port",   second:"hole"   },
  // POST
  { word:"postbox",    first:"post",   second:"box"    },
  { word:"postcard",   first:"post",   second:"card"   },
  { word:"postmark",   first:"post",   second:"mark"   },
  // POWER
  { word:"powerhouse", first:"power",  second:"house"  },
  // RAIN
  { word:"rainbow",    first:"rain",   second:"bow"    },
  { word:"raincoat",   first:"rain",   second:"coat"   },
  { word:"raindrop",   first:"rain",   second:"drop"   },
  { word:"rainforest", first:"rain",   second:"forest" },
  { word:"rainfall",   first:"rain",   second:"fall"   },
  { word:"rainstorm",  first:"rain",   second:"storm"  },
  { word:"rainwater",  first:"rain",   second:"water"  },
  // ROAD
  { word:"roadblock",  first:"road",   second:"block"  },
  { word:"roadmap",    first:"road",   second:"map"    },
  { word:"roadside",   first:"road",   second:"side"   },
  { word:"roadwork",   first:"road",   second:"work"   },
  // ROCK
  { word:"rockfall",   first:"rock",   second:"fall"   },
  { word:"rockfish",   first:"rock",   second:"fish"   },
  { word:"rockslide",  first:"rock",   second:"slide"  },
  { word:"rockstar",   first:"rock",   second:"star"   },
  // ROOF
  { word:"rooftop",    first:"roof",   second:"top"    },
  { word:"rooftree",   first:"roof",   second:"tree"   },
  // ROOM
  { word:"roommate",   first:"room",   second:"mate"   },
  // SAND
  { word:"sandbank",   first:"sand",   second:"bank"   },
  { word:"sandbox",    first:"sand",   second:"box"    },
  { word:"sandcastle", first:"sand",   second:"castle" },
  { word:"sandpaper",  first:"sand",   second:"paper"  },
  { word:"sandstone",  first:"sand",   second:"stone"  },
  { word:"sandstorm",  first:"sand",   second:"storm"  },
  // SCHOOL
  { word:"schoolbook", first:"school", second:"book"   },
  { word:"schoolhouse",first:"school", second:"house"  },
  { word:"schoolmate", first:"school", second:"mate"   },
  { word:"schoolroom", first:"school", second:"room"   },
  { word:"schoolwork", first:"school", second:"work"   },
  { word:"schoolyard", first:"school", second:"yard"   },
  // SET
  { word:"setback",    first:"set",    second:"back"   },
  // SHIP
  { word:"shipmate",   first:"ship",   second:"mate"   },
  { word:"shipwreck",  first:"ship",   second:"wreck"  },
  { word:"shipyard",   first:"ship",   second:"yard"   },
  // SIDE
  { word:"sidebar",    first:"side",   second:"bar"    },
  { word:"sideline",   first:"side",   second:"line"   },
  { word:"sideshow",   first:"side",   second:"show"   },
  { word:"sidestep",   first:"side",   second:"step"   },
  { word:"sidetrack",  first:"side",   second:"track"  },
  { word:"sidewalk",   first:"side",   second:"walk"   },
  // SNOW
  { word:"snowball",   first:"snow",   second:"ball"   },
  { word:"snowboard",  first:"snow",   second:"board"  },
  { word:"snowdrift",  first:"snow",   second:"drift"  },
  { word:"snowfall",   first:"snow",   second:"fall"   },
  { word:"snowflake",  first:"snow",   second:"flake"  },
  { word:"snowman",    first:"snow",   second:"man"    },
  { word:"snowplow",   first:"snow",   second:"plow"   },
  { word:"snowstorm",  first:"snow",   second:"storm"  },
  // SPACE
  { word:"spaceship",  first:"space",  second:"ship"   },
  { word:"spaceport",  first:"space",  second:"port"   },
  { word:"spacewalk",  first:"space",  second:"walk"   },
  // STAR
  { word:"starboard",  first:"star",   second:"board"  },
  { word:"starburst",  first:"star",   second:"burst"  },
  { word:"stardust",   first:"star",   second:"dust"   },
  { word:"starfish",   first:"star",   second:"fish"   },
  { word:"starlight",  first:"star",   second:"light"  },
  // STEP
  { word:"stepladder", first:"step",   second:"ladder" },
  // STICK
  { word:"stickball",  first:"stick",  second:"ball"   },
  // STONE
  { word:"stonefish",  first:"stone",  second:"fish"   },
  { word:"stonework",  first:"stone",  second:"work"   },
  { word:"stonewall",  first:"stone",  second:"wall"   },
  // STORE
  { word:"storefront", first:"store",  second:"front"  },
  { word:"storehouse", first:"store",  second:"house"  },
  { word:"storeroom",  first:"store",  second:"room"   },
  // STORM
  { word:"stormcloud", first:"storm",  second:"cloud"  },
  { word:"stormwater", first:"storm",  second:"water"  },
  // SUN
  { word:"sunbeam",    first:"sun",    second:"beam"   },
  { word:"sunburn",    first:"sun",    second:"burn"   },
  { word:"sundown",    first:"sun",    second:"down"   },
  { word:"sunflower",  first:"sun",    second:"flower" },
  { word:"sunlight",   first:"sun",    second:"light"  },
  { word:"sunroof",    first:"sun",    second:"roof"   },
  { word:"sunscreen",  first:"sun",    second:"screen" },
  { word:"sunshine",   first:"sun",    second:"shine"  },
  { word:"sunrise",    first:"sun",    second:"rise"   },
  { word:"sunset",     first:"sun",    second:"set"    },
  { word:"sunspot",    first:"sun",    second:"spot"   },
  { word:"sunstroke",  first:"sun",    second:"stroke" },
  // TAIL
  { word:"tailback",   first:"tail",   second:"back"   },
  { word:"tailgate",   first:"tail",   second:"gate"   },
  { word:"tailpipe",   first:"tail",   second:"pipe"   },
  { word:"tailspin",   first:"tail",   second:"spin"   },
  { word:"tailwind",   first:"tail",   second:"wind"   },
  // TEAM
  { word:"teammate",   first:"team",   second:"mate"   },
  { word:"teamwork",   first:"team",   second:"work"   },
  // TOWN
  { word:"townhouse",  first:"town",   second:"house"  },
  // TREE
  { word:"treehouse",  first:"tree",   second:"house"  },
  { word:"treetop",    first:"tree",   second:"top"    },
  // WALL
  { word:"wallboard",  first:"wall",   second:"board"  },
  { word:"wallflower", first:"wall",   second:"flower" },
  { word:"wallpaper",  first:"wall",   second:"paper"  },
  // WATCH
  { word:"watchdog",   first:"watch",  second:"dog"    },
  { word:"watchman",   first:"watch",  second:"man"    },
  // WATER
  { word:"watercolor", first:"water",  second:"color"  },
  { word:"waterfall",  first:"water",  second:"fall"   },
  { word:"waterfront", first:"water",  second:"front"  },
  { word:"watermark",  first:"water",  second:"mark"   },
  { word:"waterproof", first:"water",  second:"proof"  },
  { word:"waterway",   first:"water",  second:"way"    },
  // WAVE
  { word:"wavelength", first:"wave",   second:"length" },
  // WAY
  { word:"wayside",    first:"way",    second:"side"   },
  { word:"waypoint",   first:"way",    second:"point"  },
  // WHEEL
  { word:"wheelchair", first:"wheel",  second:"chair"  },
  // WIND
  { word:"windfall",   first:"wind",   second:"fall"   },
  { word:"windmill",   first:"wind",   second:"mill"   },
  { word:"windpipe",   first:"wind",   second:"pipe"   },
  { word:"windshield", first:"wind",   second:"shield" },
  { word:"windsock",   first:"wind",   second:"sock"   },
  { word:"windstorm",  first:"wind",   second:"storm"  },
  // WOOD
  { word:"woodchuck",  first:"wood",   second:"chuck"  },
  { word:"woodland",   first:"wood",   second:"land"   },
  { word:"woodpecker", first:"wood",   second:"pecker" },
  { word:"woodshed",   first:"wood",   second:"shed"   },
  { word:"woodwind",   first:"wood",   second:"wind"   },
  { word:"woodwork",   first:"wood",   second:"work"   },
  // WORK
  { word:"workbook",   first:"work",   second:"book"   },
  { word:"workday",    first:"work",   second:"day"    },
  { word:"workforce",  first:"work",   second:"force"  },
  { word:"workload",   first:"work",   second:"load"   },
  { word:"workplace",  first:"work",   second:"place"  },
  { word:"worksheet",  first:"work",   second:"sheet"  },
  { word:"workshop",   first:"work",   second:"shop"   },
  { word:"workout",    first:"work",   second:"out"    },
  // WORM
  { word:"wormhole",   first:"worm",   second:"hole"   },
  { word:"wormwood",   first:"worm",   second:"wood"   },
  // YARD
  { word:"yardstick",  first:"yard",   second:"stick"  },
  // leads-in for key bridges
  { word:"beachball",  first:"beach",  second:"ball"   },
  { word:"beachfront", first:"beach",  second:"front"  },
  { word:"birthday",   first:"birth",  second:"day"    }, // dup-safe: findIndex handles it
  { word:"cardboard",  first:"card",   second:"board"  },
  { word:"cornfield",  first:"corn",   second:"field"  },
  { word:"countdown",  first:"count",  second:"down"   },
  { word:"driftwood",  first:"drift",  second:"wood"   },
  { word:"farmhand",   first:"farm",   second:"hand"   },
  { word:"fingerprint",first:"finger", second:"print"  },
  { word:"fingernail", first:"finger", second:"nail"   },
  { word:"fingertip",  first:"finger", second:"tip"    },
  { word:"flashlight", first:"flash",  second:"light"  },
  { word:"football",   first:"foot",   second:"ball"   },
  { word:"footstep",   first:"foot",   second:"step"   },
  { word:"goldfish",   first:"gold",   second:"fish"   },
  { word:"grassland",  first:"grass",  second:"land"   },
  { word:"gunfire",    first:"gun",    second:"fire"   },
  { word:"gunshot",    first:"gun",    second:"shot"   },
  { word:"gunsmith",   first:"gun",    second:"smith"  },
  { word:"hairband",   first:"hair",   second:"band"   },
  { word:"haircut",    first:"hair",   second:"cut"    },
  { word:"hairpin",    first:"hair",   second:"pin"    },
  { word:"handball",   first:"hand",   second:"ball"   },
  { word:"handstand",  first:"hand",   second:"stand"  },
  { word:"headband",   first:"head",   second:"band"   },
  { word:"headboard",  first:"head",   second:"board"  },
  { word:"headlight",  first:"head",   second:"light"  },
  { word:"headstone",  first:"head",   second:"stone"  },
  { word:"heartburn",  first:"heart",  second:"burn"   },
  { word:"hotdog",     first:"hot",    second:"dog"    },
  { word:"hotshot",    first:"hot",    second:"shot"   },
  { word:"inkwell",    first:"ink",    second:"well"   },
  { word:"landmark",   first:"land",   second:"mark"   },
  { word:"limestone",  first:"lime",   second:"stone"  },
  { word:"lipstick",   first:"lip",    second:"stick"  },
  { word:"lockdown",   first:"lock",   second:"down"   },
  { word:"moonlight",  first:"moon",   second:"light"  },
  { word:"moonrise",   first:"moon",   second:"rise"   },
  { word:"neckline",   first:"neck",   second:"line"   },
  { word:"network",    first:"net",    second:"work"   },
  { word:"notebook",   first:"note",   second:"book"   },
  { word:"outback",    first:"out",    second:"back"   },
  { word:"overpass",   first:"over",   second:"pass"   },
  { word:"railroad",   first:"rail",   second:"road"   },
  { word:"railway",    first:"rail",   second:"way"    },
  { word:"raindrop",   first:"rain",   second:"drop"   },
  { word:"riverbank",  first:"river",  second:"bank"   },
  { word:"riverbed",   first:"river",  second:"bed"    },
  { word:"riverside",  first:"river",  second:"side"   },
  { word:"roadway",    first:"road",   second:"way"    },
  { word:"rooftop",    first:"roof",   second:"top"    },
  { word:"saltwater",  first:"salt",   second:"water"  },
  { word:"sandpaper",  first:"sand",   second:"paper"  },
  { word:"sawdust",    first:"saw",    second:"dust"   },
  { word:"sawmill",    first:"saw",    second:"mill"   },
  { word:"seabird",    first:"sea",    second:"bird"   },
  { word:"seafood",    first:"sea",    second:"food"   },
  { word:"seashore",   first:"sea",    second:"shore"  },
  { word:"seawall",    first:"sea",    second:"wall"   },
  { word:"seaweed",    first:"sea",    second:"weed"   },
  { word:"shopfront",  first:"shop",   second:"front"  },
  { word:"shopkeeper", first:"shop",   second:"keeper" },
  { word:"shortfall",  first:"short",  second:"fall"   },
  { word:"shorthand",  first:"short",  second:"hand"   },
  { word:"shortstop",  first:"short",  second:"stop"   },
  { word:"slingshot",  first:"sling",  second:"shot"   },
  { word:"snowshoe",   first:"snow",   second:"shoe"   },
  { word:"songbird",   first:"song",   second:"bird"   },
  { word:"spotlight",  first:"spot",   second:"light"  },
  { word:"springtime", first:"spring", second:"time"   },
  { word:"standout",   first:"stand",  second:"out"    },
  { word:"standstill", first:"stand",  second:"still"  },
  { word:"starfish",   first:"star",   second:"fish"   },
  { word:"steamboat",  first:"steam",  second:"boat"   },
  { word:"steamship",  first:"steam",  second:"ship"   },
  { word:"storeroom",  first:"store",  second:"room"   },
  { word:"storefront", first:"store",  second:"front"  },
  { word:"suitcase",   first:"suit",   second:"case"   },
  { word:"sunflower",  first:"sun",    second:"flower" },
  { word:"supernova",  first:"super",  second:"nova"   },
  { word:"swordfish",  first:"sword",  second:"fish"   },
  { word:"swordplay",  first:"sword",  second:"play"   },
  { word:"tablecloth", first:"table",  second:"cloth"  },
  { word:"tabletop",   first:"table",  second:"top"    },
  { word:"thumbprint", first:"thumb",  second:"print"  },
  { word:"thumbnail",  first:"thumb",  second:"nail"   },
  { word:"thumbtack",  first:"thumb",  second:"tack"   },
  { word:"thunderstorm",first:"thunder",second:"storm" },
  { word:"thunderbolt",first:"thunder",second:"bolt"   },
  { word:"toadstool",  first:"toad",   second:"stool"  },
  { word:"topsoil",    first:"top",    second:"soil"   },
  { word:"trademark",  first:"trade",  second:"mark"   },
  { word:"treadmill",  first:"tread",  second:"mill"   },
  { word:"underwater", first:"under",  second:"water"  },
  { word:"uphill",     first:"up",     second:"hill"   },
  { word:"upside",     first:"up",     second:"side"   },
  { word:"upstroke",   first:"up",     second:"stroke" },
  { word:"uptown",     first:"up",     second:"town"   },
  { word:"wasteland",  first:"waste",  second:"land"   },
  { word:"watchword",  first:"watch",  second:"word"   },
  { word:"waterfall",  first:"water",  second:"fall"   },
  { word:"webpage",    first:"web",    second:"page"   },
  { word:"website",    first:"web",    second:"site"   },
  { word:"weekday",    first:"week",   second:"day"    },
  { word:"weekend",    first:"week",   second:"end"    },
  { word:"wellspring", first:"well",   second:"spring" },
  { word:"whirlpool",  first:"whirl",  second:"pool"   },
  { word:"whirlwind",  first:"whirl",  second:"wind"   },
  { word:"wildlife",   first:"wild",   second:"life"   },
  { word:"wildfire",   first:"wild",   second:"fire"   },
  { word:"windbreak",  first:"wind",   second:"break"  },
  { word:"wingman",    first:"wing",   second:"man"    },
  { word:"wingspan",   first:"wing",   second:"span"   },
  { word:"woodland",   first:"wood",   second:"land"   },
  { word:"wordplay",   first:"word",   second:"play"   },
  { word:"wordsmith",  first:"word",   second:"smith"  },
  { word:"worksheet",  first:"work",   second:"sheet"  },
  { word:"wristband",  first:"wrist",  second:"band"   },
  { word:"wristwatch", first:"wrist",  second:"watch"  },
  { word:"yearbook",   first:"year",   second:"book"   },
  { word:"yearlong",   first:"year",   second:"long"   },
];

// ── Seed words (bridges to start each game with — each has 4+ valid continuations) ──
const SEED_WORDS = [
  'sun','fire','snow','rain','day','night','back','foot',
  'book','water','black','blue','star','wood','air','home',
  'horse','gold','cross','play','eye','door','hand','team',
];

// ── State ─────────────────────────────────────────────────────────────────
let words = [];
let state = {
  bridge: 'sun',
  chain: [],
  usedWords: new Set(),
  hintsLeft: 2,
  timerSec: 30,
  timerMax: 30,
  timerInterval: null,
  bestScore: 0,
  running: false,
};

// ── Timer config by chain length ──────────────────────────────────────────
function getTimerForLength(len) {
  if (len < 5)  return 30;
  if (len < 10) return 25;
  if (len < 15) return 20;
  return 15;
}

// ── Difficulty label based on available options for current bridge ─────────
function getDifficultyLabel(optionCount) {
  if (optionCount >= 6) return { text: 'Easy',   cls: 'diff-easy'   };
  if (optionCount >= 3) return { text: 'Medium', cls: 'diff-medium' };
  if (optionCount >= 2) return { text: 'Hard',   cls: 'diff-hard'   };
  return                       { text: 'Expert', cls: 'diff-expert' };
}

// ── Badges ────────────────────────────────────────────────────────────────
function getBadge(score) {
  if (score >= 20) return { icon: '👑', name: 'Weave Legend'     };
  if (score >= 15) return { icon: '🌟', name: 'Chain Wizard'     };
  if (score >= 10) return { icon: '🎯', name: 'Thread Master'    };
  if (score >= 6)  return { icon: '🧵', name: 'Word Weaver'      };
  if (score >= 3)  return { icon: '🔗', name: 'Link Maker'       };
  return                  { icon: '🪢', name: 'Tangled Beginner' };
}

// ── DOM refs ──────────────────────────────────────────────────────────────
const screens = {
  home: document.getElementById('screen-home'),
  game: document.getElementById('screen-game'),
  end:  document.getElementById('screen-end'),
};
const el = {
  bridgeWord:     document.getElementById('bridge-word'),
  wordInput:      document.getElementById('word-input'),
  submitBtn:      document.getElementById('submit-btn'),
  feedback:       document.getElementById('feedback-msg'),
  chainTrail:     document.getElementById('chain-trail'),
  timerCountdown: document.getElementById('timer-countdown'),
  timerProgress:  document.getElementById('timer-progress'),
  chainNum:       document.getElementById('chain-num'),
  hintBtn:        document.getElementById('hint-btn'),
  hintCount:      document.getElementById('hint-count'),
  diffLabel:      document.getElementById('diff-label'),
  headerBest:     document.getElementById('header-best'),
  endBadgeIcon:   document.getElementById('end-badge-icon'),
  endBadgeName:   document.getElementById('end-badge-name'),
  endScoreNum:    document.getElementById('end-score-num'),
  endChainWords:  document.getElementById('end-chain-words'),
  endFeedback:    document.getElementById('feedback-msg-end'),
  shareBtn:       document.getElementById('share-btn'),
  playAgainBtn:   document.getElementById('play-again-btn'),
  shareToast:     document.getElementById('share-toast'),
};

// ── Screen routing ────────────────────────────────────────────────────────
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ── Timer ─────────────────────────────────────────────────────────────────
const RING_R = 40;
const RING_C = 2 * Math.PI * RING_R;

function setTimerVisual(sec, max) {
  const pct = sec / max;
  el.timerProgress.style.strokeDashoffset = RING_C * (1 - pct);
  el.timerCountdown.textContent = sec;
  el.timerProgress.classList.toggle('urgent', pct <= 0.35);
}

function startTimer() {
  clearInterval(state.timerInterval);
  const max = getTimerForLength(state.chain.length);
  state.timerMax = max;
  state.timerSec = max;
  el.timerProgress.style.transition = 'none';
  setTimerVisual(max, max);
  state.timerInterval = setInterval(() => {
    state.timerSec--;
    setTimerVisual(state.timerSec, state.timerMax);
    if (state.timerSec <= 0) endGame('timeout');
  }, 1000);
}

// ── Game logic ────────────────────────────────────────────────────────────
function validOptions(bridge) {
  return words.filter(w => w.first === bridge && !state.usedWords.has(w.word));
}

function startGame() {
  // Pick a random seed each game
  state.bridge = SEED_WORDS[Math.floor(Math.random() * SEED_WORDS.length)];
  state.chain = [];
  state.usedWords = new Set();
  state.hintsLeft = 2;
  state.running = true;

  el.hintCount.textContent = '2';
  el.hintBtn.disabled = false;
  el.wordInput.value = '';
  el.wordInput.disabled = false;
  el.submitBtn.disabled = false;
  setFeedback('', '');
  renderChainTrail();
  updateChainCounter();
  updateDiffLabel();
  el.bridgeWord.textContent = state.bridge;
  el.wordInput.focus();
  showScreen('game');
  startTimer();
}

function updateChainCounter() {
  el.chainNum.textContent = state.chain.length;
}

function updateDiffLabel() {
  const opts = validOptions(state.bridge);
  const d = getDifficultyLabel(opts.length);
  el.diffLabel.textContent = d.text;
  el.diffLabel.className = 'difficulty-tag ' + d.cls;
}

function setFeedback(msg, type) {
  el.feedback.textContent = msg;
  el.feedback.className = 'feedback-msg' + (type ? ' ' + type : '');
}

function renderChainTrail() {
  if (state.chain.length === 0) {
    el.chainTrail.innerHTML = '<span class="chain-trail-empty">Your chain will appear here…</span>';
    return;
  }
  el.chainTrail.innerHTML = state.chain.map((entry, i) => {
    const arrow = i < state.chain.length - 1 ? '<span class="link-arrow">→</span>' : '';
    return `<span class="chain-link-word">
      <span class="link-first">${entry.first}</span><span class="link-connector">+</span><span class="link-second">${entry.second}</span>${arrow}
    </span>`;
  }).join('');
  el.chainTrail.scrollLeft = el.chainTrail.scrollWidth;
}

function submitWord() {
  if (!state.running) return;
  const raw = el.wordInput.value.trim().toLowerCase().replace(/\s+/g, '');
  if (!raw) return;

  if (state.usedWords.has(raw)) {
    bounce('Already used that word!', 'error');
    return;
  }

  const match = words.find(w => w.word === raw && w.first === state.bridge);
  if (!match) {
    const anyMatch = words.find(w => w.word === raw);
    if (anyMatch) {
      bounce(`"${raw}" doesn't start with "${state.bridge}"!`, 'error');
    } else {
      bounce(`"${raw}" isn't in the word list!`, 'error');
    }
    return;
  }

  // Correct!
  state.usedWords.add(raw);
  state.chain.push(match);
  state.bridge = match.second;

  el.wordInput.classList.add('correct');
  setTimeout(() => el.wordInput.classList.remove('correct'), 400);
  el.wordInput.value = '';
  setFeedback('', '');

  updateChainCounter();
  renderChainTrail();
  el.bridgeWord.textContent = state.bridge;
  updateDiffLabel();

  if (validOptions(state.bridge).length === 0) {
    endGame('dead-end');
    return;
  }

  startTimer();
  el.wordInput.focus();
}

function bounce(msg, type) {
  el.wordInput.classList.remove('shake');
  void el.wordInput.offsetWidth;
  el.wordInput.classList.add('shake');
  setTimeout(() => el.wordInput.classList.remove('shake'), 400);
  setFeedback(msg, type);
}

function showHint() {
  if (state.hintsLeft <= 0 || !state.running) return;
  const opts = validOptions(state.bridge);
  if (opts.length === 0) {
    setFeedback('No valid words available!', 'error');
    return;
  }
  // Prefer words whose bridge leads to further valid options (avoids immediate dead-ends)
  const goodOpts = opts.filter(w => validOptions(w.second).length > 0);
  const pool = goodOpts.length > 0 ? goodOpts : opts;
  const pick = pool[Math.floor(Math.random() * pool.length)];

  state.hintsLeft--;
  el.hintCount.textContent = state.hintsLeft;
  if (state.hintsLeft === 0) el.hintBtn.disabled = true;
  setFeedback(`Hint: try "${pick.word}"`, 'hint');
}

function endGame(reason) {
  clearInterval(state.timerInterval);
  state.running = false;
  el.wordInput.disabled = true;
  el.submitBtn.disabled = true;

  const score = state.chain.length;
  if (score > state.bestScore) {
    state.bestScore = score;
    el.headerBest.textContent = score;
    localStorage.setItem('ww_best', score);
  }

  const badge = getBadge(score);
  el.endBadgeIcon.textContent = badge.icon;
  el.endBadgeName.textContent = badge.name;
  el.endScoreNum.textContent = score;

  if (state.chain.length === 0) {
    el.endChainWords.innerHTML = '<span style="color:var(--text-muted);font-style:italic;">No words in chain</span>';
  } else {
    el.endChainWords.innerHTML = state.chain.map((entry, i) => {
      const arrow = i < state.chain.length - 1 ? '<span class="end-arrow">→</span>' : '';
      return `<span class="end-word-pill">${entry.word}</span>${arrow}`;
    }).join('');
  }

  let reasonMsg = '';
  let reasonType = '';
  if (reason === 'timeout')  { reasonMsg = '⏱️ Time ran out!';                        reasonType = 'error';   }
  if (reason === 'dead-end') { reasonMsg = '🎉 No valid words left — chain complete!'; reasonType = 'success'; }

  el.endFeedback.textContent = reasonMsg;
  el.endFeedback.className = 'feedback-msg' + (reasonType ? ' ' + reasonType : '');
  showScreen('end');
}

// ── Share ─────────────────────────────────────────────────────────────────
function share() {
  const score = state.chain.length;
  const badge = getBadge(score);
  const chainStr = state.chain.map(w => w.word).join(' → ');
  const text = [
    `🧵 Word Weave`,
    `Chain: ${score} link${score !== 1 ? 's' : ''} | ${badge.icon} ${badge.name}`,
    chainStr || '',
    `Think you can beat it?`,
  ].filter(Boolean).join('\n');

  navigator.clipboard.writeText(text).then(() => {
    el.shareToast.textContent = 'Copied to clipboard!';
    el.shareToast.classList.add('show');
    setTimeout(() => el.shareToast.classList.remove('show'), 2500);
  }).catch(() => {
    el.shareToast.textContent = 'Copy: ' + text;
    el.shareToast.classList.add('show');
    setTimeout(() => el.shareToast.classList.remove('show'), 4000);
  });
}

// ── Event wiring ──────────────────────────────────────────────────────────
document.getElementById('start-btn').addEventListener('click', startGame);
el.submitBtn.addEventListener('click', submitWord);
el.wordInput.addEventListener('keydown', e => { if (e.key === 'Enter') submitWord(); });
el.hintBtn.addEventListener('click', showHint);
el.shareBtn.addEventListener('click', share);
el.playAgainBtn.addEventListener('click', startGame);

// ── Init ──────────────────────────────────────────────────────────────────
function init() {
  // Deduplicate by word name (safety net)
  words = WORD_LIST.filter((w, i, arr) => arr.findIndex(x => x.word === w.word) === i);

  const saved = parseInt(localStorage.getItem('ww_best') || '0', 10);
  state.bestScore = saved;
  el.headerBest.textContent = saved;

  el.timerProgress.style.strokeDasharray = RING_C;
  el.timerProgress.style.strokeDashoffset = 0;

  showScreen('home');
}

init();
