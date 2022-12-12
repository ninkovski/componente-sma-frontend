export interface DatosUsuario {
    id:                 number;
    cuuid:              string;
    usuario:            string;
    correo:             string;
    fecha_ult_acc:      Date;
    hora_ult_acc:       string;
    tipo_doc_nombre:    string;
    numero_doc:         string;
    nombres:            string;
    correo_ins:         string;
    papellido:          string;
    sapellido:          string;
    foto_rec:           string;
    foto:               string;
    estado:             string;
    superuser:          string;
    staff:              string;
    historial:          Historial;
    persona_id:         string;
    rel_laboral_nombre: string;
    rel_laboral_codigo: string;
    siga:               null;
}

export interface SesionInfo {
    id:            number;
    fecha_ingreso: Date;
    hora_ingreso:  string;
    fecha_expire:  Date;
    hora_expire:   string;
    historial:     Historial;
    actual:        boolean;
}

interface Historial {
    fecha:         null|Date;
    navegador:     string;
    naveg_vers:    string;
    sist_ope:      string;
    sist_ope_vers: string;
    disptvo:       string;
    tipo_disptvo:  string;
    ip:            string;
    hora:          string;
}

export interface AppInfo {
    cuuid:          null|string;
    logo:           string;
    siglas:         string;
    nombre:         string;
    entidad_nombre: null|string;
    ruta:           null|string;
}


export interface MenuJerarquico {
    id:         number;
    title:      string;
    icon:       string;
    routerLink: null | string;
    target:     null | string;
    clase:      Clase;
    badge:      string;
    badgeClase: string;
    children:   MenuJerarquico[];
}

enum Clase {
    Empty = "",
    Sub = "sub",
}

export interface CategoriaApps {
    id:            number;
    cuuid:         string;
    nombre:        string;
    nombre_plural: string;
    icono:         string;
    aplicaciones:  Aplicacion[];
}

export interface Aplicacion {
    id:          number;
    logo:        string;
    siglas:      string;
    nombre:      string;
    ruta:        null | string;
    clase_color: string;
    version:     null | string;
    cuuid:       string;
    acceso:      Acceso;
}

export interface Acceso {
    dias:        number | null;
    descripcion: string;
}


export interface AppRedirect {
    cuuid:     null|string;
    nombre:    string;
    siglas:    string;
    ruta:      null|string;
    target:    null|string;
    send_auth: null|boolean;
    ruta_auth: null|string;
}

export interface AppClient {
    id:     null|number;
    logo:   string;
    siglas: string;
    nombre: string;
    cuuid:  null|string;
}

export interface UrlLogin {
    url: string;
}

export interface RutasAcceso {
    ruta_apps: string;
    ruta_admin_cuenta: string;
}
