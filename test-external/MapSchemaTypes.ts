import { Schema, type, ArraySchema, MapSchema } from "../src";

class IAmAChild extends Schema {
  @type("number") x: number;
  @type("number") y: number;
}

class MapSchemaTypes extends Schema {
  @type({ map: IAmAChild }) mapOfSchemas = new MapSchema<IAmAChild>();
  @type({ map: "number" }) mapOfNumbers = new MapSchema<number>();
  @type({ map: "string" }) mapOfStrings = new MapSchema<string>();
  @type({ map: "int32" }) mapOfInt32 = new MapSchema<string>();
}

const state = new MapSchemaTypes();
state.mapOfNumbers['one'] = 1;
state.mapOfNumbers['two'] = 2;
state.mapOfNumbers['three'] = 3;

state.mapOfSchemas['one'] = new IAmAChild();
state.mapOfSchemas['one'].x = 100;
state.mapOfSchemas['one'].y = 200;
state.mapOfSchemas['two'] = new IAmAChild();
state.mapOfSchemas['two'].x = 300;
state.mapOfSchemas['two'].y = 400;

state.mapOfStrings['one'] = "One";
state.mapOfStrings['two'] = "Two";

state.mapOfInt32['one'] = 1000;
state.mapOfInt32['two'] = -1000;

const bytes = Array.from(Uint8Array.from(Buffer.from( state.encode() )));

console.log("MapSchemaTypes =>");
console.log(`{ ${bytes.join(", ")} }`);