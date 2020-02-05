export interface TsIdentifiable {
    id: number;
    name: string;
    flags?: Partial<TsVisibilityFlags>;
    comment?: TsComment;
}

export interface TsComment {
    shortText: string;
    text: string;
    tags: { tag: string, text: string }[];
}

export interface TsVisibilityFlags {
    isExported: boolean;
    isProtected: boolean;
    isOptional: boolean;
}

export interface TsTypeMember extends TsIdentifiable {
    kindString: "Property" | "Method";
    type: TsTypeReference;
}

export interface TsMethod extends TsIdentifiable {
    signatures: TsMethodSignature[];
}

export interface TsMethodSignature extends TsIdentifiable {
    parameters: TsMethodParameter[];
}

export interface TsTypeReference {
    id?: number;
    type: string;
    name: string;
}

export interface TsMethodParameter extends TsIdentifiable {
    type: TsTypeReference;
}

export interface TsClass extends TsIdentifiable {
    kindString: "Class";
    children?: TsTypeMember[];
}

export interface TsInterface extends TsIdentifiable {
    kindString: "Interface";
    children?: TsTypeMember[];
}

export type TsModuleMember = TsClass | TsInterface;

export interface TsModule extends TsIdentifiable {
    name: string;
    children?: TsModuleMember[];
}

export interface TsApiDefinition extends TsIdentifiable {
    originalName: string;
    children: TsModule[];
}

export type Dictionary<T> = { [id: number]: T };

export function dict_put<T>(dict: Dictionary<T>, id: number, item: T) {
    dict[id] = item;
}

export function dict_has_key<T>(dict: Dictionary<T>, id: number) {
    return typeof (dict[id]) != 'undefined';
}

export function dict_get<T>(dict: Dictionary<T>, id: number) {
    return dict[id];
}

export function dict_count<T>(dict: Dictionary<T>) {
    return Object.keys(dict).length;
}

export function dict_keys<T>(dict: Dictionary<T>): number[] {
    return Object.keys(dict).map(k => parseInt(k, 10));
}