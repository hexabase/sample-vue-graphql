export type WorkSpacesInfo = {
    workspace_id: string,
    workspace_name: string,
}

export type WorkSpaces = {
    workspaces: [WorkSpacesInfo],
    current_workspace_id: string,
}

export type WId = {
    w_id: string,
}

export type Name = {
    name: string,
}
