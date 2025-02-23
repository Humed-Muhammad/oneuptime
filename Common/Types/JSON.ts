import ObjectID from './ObjectID';
import Version from './Version';
import Email from './Email';
import Phone from './Phone';
import Color from './Color';
import Route from './API/Route';
import URL from './API/URL';
import Name from './Name';
import Permission from './Permission';
import Search from './Database/Search';
import Typeof from './Typeof';
import Port from './Port';
import Hostname from './API/Hostname';
import HashedString from './HashedString';
import DatabaseProperty from './Database/DatabaseProperty';

enum ObjectType {
    ObjectID = 'ObjectID',
    Name = 'Name',
    Email = 'Email',
    Phone = 'Phone',
    Color = 'Color',
    Version = 'Version',
    Route = 'Route',
    URL = 'URL',
    Permission = 'Permission',
    Search = 'Search',
    Port = 'Port',
    Hostname = 'Hostname',
    HashedString = 'HashedString',
}

export type JSONValue =
    | Array<string>
    | string
    | Array<number>
    | number
    | Array<boolean>
    | boolean
    | JSONObject
    | JSONArray
    | Date
    | Array<Date>
    | ObjectID
    | Array<ObjectID>
    | Name
    | Array<Name>
    | Email
    | Array<Email>
    | Color
    | Array<Color>
    | Phone
    | Array<Phone>
    | Route
    | Array<Route>
    | URL
    | Array<URL>
    | Array<Version>
    | Version
    | Buffer
    | Permission
    | Array<Permission>
    | Search
    | Array<Search>
    | Port
    | Array<Port>
    | HashedString
    | Array<HashedString>
    | Hostname
    | Array<Hostname>
    | Array<JSONValue>
    | Array<Permission>
    | Array<JSONValue>
    | null;

export interface JSONObject {
    [x: string]: JSONValue;
}

export type JSONArray = Array<JSONObject>;

export class JSONFunctions {
    public static toCompressedString(val: JSONValue): string {
        return JSON.stringify(val, null, 2);
    }

    public static toString(val: JSONValue): string {
        return JSON.stringify(val);
    }

    // this funciton serializes JSON with Common Objects to JSON that can be stringified.
    public static serialize(val: JSONObject): JSONObject {
        const newVal: JSONValue = {};

        for (const key in val) {
            if (!val[key]) {
                continue;
            }

            if (Array.isArray(val[key])) {
                const arraySerialize: Array<JSONValue> = [];
                for (const arrVal of val[key] as Array<JSONValue>) {
                    arraySerialize.push(this.serializeValue(arrVal));
                }

                newVal[key] = arraySerialize;
            } else {
                newVal[key] = this.serializeValue(val[key] as JSONValue);
            }
        }

        return newVal;
    }

    public static serializeValue(val: JSONValue): JSONValue {
        if (!val) {
            return val;
        } else if (val && val instanceof Name) {
            return {
                _type: ObjectType.Name,
                value: (val as Name).toString(),
            };
        } else if (val && val instanceof ObjectID) {
            return {
                _type: ObjectType.ObjectID,
                value: (val as ObjectID).toString(),
            };
        } else if (val && val instanceof Phone) {
            return {
                _type: ObjectType.Phone,
                value: (val as Phone).toString(),
            };
        } else if (val && val instanceof Email) {
            return {
                _type: ObjectType.Email,
                value: (val as Email).toString(),
            };
        } else if (val && val instanceof Port) {
            return {
                _type: ObjectType.Port,
                value: (val as Port).toString(),
            };
        } else if (val && val instanceof HashedString) {
            return {
                _type: ObjectType.HashedString,
                value: (val as HashedString).toString(),
            };
        } else if (val && val instanceof Hostname) {
            return {
                _type: ObjectType.Hostname,
                value: (val as Hostname).toString(),
            };
        } else if (val && val instanceof Version) {
            return {
                _type: ObjectType.Version,
                value: (val as Version).toString(),
            };
        } else if (val && val instanceof Route) {
            return {
                _type: ObjectType.Route,
                value: (val as Route).toString(),
            };
        } else if (val && val instanceof URL) {
            return {
                _type: ObjectType.URL,
                value: (val as URL).toString(),
            };
        } else if (val && val instanceof Color) {
            return {
                _type: ObjectType.Color,
                value: (val as Color).toString(),
            };
        } else if (val && val instanceof Search) {
            return {
                _type: ObjectType.Search,
                value: (val as Search).toString(),
            };
        } else if (typeof val === Typeof.Object) {
            return this.serialize(val as JSONObject);
        }

        return val;
    }

    public static deserializeValue(val: JSONValue): JSONValue {
        if (!val) {
            return val;
        } else if (val instanceof DatabaseProperty) {
            return val;
        } else if (
            val &&
            typeof val === Typeof.Object &&
            (val as JSONObject)['_type'] &&
            (val as JSONObject)['value'] &&
            typeof (val as JSONObject)['value'] === Typeof.String &&
            ((val as JSONObject)['_type'] as string) === ObjectType.Name
        ) {
            val = new Name((val as JSONObject)['value'] as string);
        } else if (
            val &&
            typeof val === Typeof.Object &&
            (val as JSONObject)['_type'] &&
            (val as JSONObject)['value'] &&
            typeof (val as JSONObject)['value'] === Typeof.String &&
            ((val as JSONObject)['_type'] as string) === ObjectType.ObjectID
        ) {
            val = new ObjectID((val as JSONObject)['value'] as string);
        } else if (
            val &&
            typeof val === Typeof.Object &&
            (val as JSONObject)['_type'] &&
            (val as JSONObject)['value'] &&
            typeof (val as JSONObject)['value'] === Typeof.String &&
            ((val as JSONObject)['_type'] as string) === ObjectType.Phone
        ) {
            val = new Phone((val as JSONObject)['value'] as string);
        } else if (
            val &&
            typeof val === Typeof.Object &&
            (val as JSONObject)['_type'] &&
            (val as JSONObject)['value'] &&
            typeof (val as JSONObject)['value'] === Typeof.String &&
            ((val as JSONObject)['_type'] as string) === ObjectType.Email
        ) {
            val = new Email((val as JSONObject)['value'] as string);
        } else if (
            val &&
            typeof val === Typeof.Object &&
            (val as JSONObject)['_type'] &&
            (val as JSONObject)['value'] &&
            typeof (val as JSONObject)['value'] === Typeof.String &&
            ((val as JSONObject)['_type'] as string) === ObjectType.Version
        ) {
            val = new Name((val as JSONObject)['value'] as string);
        } else if (
            val &&
            typeof val === Typeof.Object &&
            (val as JSONObject)['_type'] &&
            (val as JSONObject)['value'] &&
            typeof (val as JSONObject)['value'] === Typeof.String &&
            ((val as JSONObject)['_type'] as string) === ObjectType.Route
        ) {
            val = new Route((val as JSONObject)['value'] as string);
        } else if (
            val &&
            typeof val === Typeof.Object &&
            (val as JSONObject)['_type'] &&
            (val as JSONObject)['value'] &&
            typeof (val as JSONObject)['value'] === Typeof.String &&
            ((val as JSONObject)['_type'] as string) === ObjectType.URL
        ) {
            val = URL.fromString((val as JSONObject)['value'] as string);
        } else if (
            val &&
            typeof val === Typeof.Object &&
            (val as JSONObject)['_type'] &&
            (val as JSONObject)['value'] &&
            typeof (val as JSONObject)['value'] === Typeof.String &&
            ((val as JSONObject)['_type'] as string) === ObjectType.Port
        ) {
            val = new Port((val as JSONObject)['value'] as string);
        } else if (
            val &&
            typeof val === Typeof.Object &&
            (val as JSONObject)['_type'] &&
            (val as JSONObject)['value'] &&
            typeof (val as JSONObject)['value'] === Typeof.String &&
            ((val as JSONObject)['_type'] as string) === ObjectType.Hostname
        ) {
            val = new Hostname((val as JSONObject)['value'] as string);
        } else if (
            val &&
            typeof val === Typeof.Object &&
            (val as JSONObject)['_type'] &&
            (val as JSONObject)['value'] &&
            typeof (val as JSONObject)['value'] === Typeof.String &&
            ((val as JSONObject)['_type'] as string) === ObjectType.HashedString
        ) {
            val = new HashedString((val as JSONObject)['value'] as string);
        } else if (
            val &&
            typeof val === Typeof.Object &&
            (val as JSONObject)['_type'] &&
            (val as JSONObject)['value'] &&
            typeof (val as JSONObject)['value'] === Typeof.String &&
            ((val as JSONObject)['_type'] as string) === ObjectType.Color
        ) {
            val = new Color((val as JSONObject)['value'] as string);
        } else if (
            val &&
            typeof val === Typeof.Object &&
            (val as JSONObject)['_type'] &&
            (val as JSONObject)['value'] &&
            typeof (val as JSONObject)['value'] === Typeof.String &&
            ((val as JSONObject)['_type'] as string) === ObjectType.Search
        ) {
            val = new Search((val as JSONObject)['value'] as string);
        } else if (typeof val === Typeof.Object) {
            val = this.deserialize(val as JSONObject);
        }

        return val;
    }

    public static deserializeArray(array: JSONArray): JSONArray {
        const returnArr: JSONArray = [];

        for (const obj of array) {
            returnArr.push(this.deserialize(obj));
        }

        return returnArr;
    }

    public static serializeArray(array: JSONArray): JSONArray {
        const returnArr: JSONArray = [];

        for (const obj of array) {
            returnArr.push(this.serialize(obj));
        }

        return returnArr;
    }

    public static deserialize(val: JSONObject): JSONObject {
        const newVal: JSONObject = {};
        for (const key in val) {
            if (!val[key]) {
                continue;
            }

            if (Array.isArray(val[key])) {
                const arraySerialize: Array<JSONValue> = [];
                for (const arrVal of val[key] as Array<JSONValue>) {
                    arraySerialize.push(this.deserializeValue(arrVal));
                }

                newVal[key] = arraySerialize;
            } else {
                newVal[key] = this.deserializeValue(val[key] as JSONValue);
            }
        }

        return newVal;
    }
}

export type JSONObjectOrArray = JSONObject | JSONArray;
