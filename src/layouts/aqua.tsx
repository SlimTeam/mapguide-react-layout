import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import { DEFAULT_TOOLBAR_SIZE, TOOLBAR_BACKGROUND_COLOR } from "../components/toolbar";
import { ToolbarContainer } from "../containers/toolbar";
import { AjaxViewerShim } from "../containers/ajax-viewer-shim";
import { ModalLauncher } from "../containers/modal-launcher";
import { ModalDialog } from "../components/modal-dialog";
import { connect } from "react-redux";
import { tr } from "../api/i18n";
import {
    ReduxDispatch
} from "../api/common";

const SIDEBAR_WIDTH = 250;
const LEGEND_HEIGHT = 350;
const SELECTION_DIALOG_HEIGHT = 300;
const LEGEND_DIALOG_HEIGHT = 400;
const TASK_DIALOG_HEIGHT = 400;
const DIALOG_HEADER_HEIGHT = 28 + 3;

const NAVIGATOR_PROPS = {
    style: { position: "absolute", zIndex: 1000, width: 51, height: 204, cursor: "pointer", right: 10, top: 10 }
};
const MOUSE_COORDINATE_PROPS = {
    style: { position: "absolute", bottom: 0, left: 0, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }
};
const SCALE_DISPLAY_PROPS = {
    style: { position: "absolute", bottom: 0, right: 340, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }
};
const SELECTED_FEATURE_COUNT_PROPS = {
    style: { position: "absolute", bottom: 0, right: 140, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }
};
const PBMG_PROPS = {
    style: { position: "absolute", bottom: 0, right: 0, zIndex: 100 }
};

export interface IAquaTemplateLayoutState {
    map?: any;
    config?: any;
    capabilities?: any;
}

function mapStateToProps(state: any): IAquaTemplateLayoutState {
    return {
        config: state.config,
        map: state.map.state,
        capabilities: state.config.capabilities
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch) {
    return {
        
    };
}

export type AquaTemplateLayoutProps = IAquaTemplateLayoutState;

@connect(mapStateToProps, mapDispatchToProps)
export class AquaTemplateLayout extends React.Component<AquaTemplateLayoutProps, any> {
    private fnHideTaskPane: () => void;
    private fnHideLegend: () => void;
    private fnHideSelection: () => void;
    private fnHideOverviewMap: () => void;
    constructor(props: AquaTemplateLayout) {
        super(props);
        this.fnHideLegend = this.onHideLegend.bind(this);
        this.fnHideOverviewMap = this.onHideOverviewMap.bind(this);
        this.fnHideSelection = this.onHideSelection.bind(this);
        this.fnHideTaskPane = this.onHideTaskPane.bind(this);
        this.state = {
            isTaskPaneOpen: true,
            isLegendOpen: true,
            isSelectionOpen: true,
            isOverviewMapOpen: false
        };
    }
    private onHideTaskPane() {
        this.setState({ isTaskPaneOpen: false });
    }
    private onHideLegend() {
        this.setState({ isLegendOpen: false });
    }
    private onHideSelection() {
        this.setState({ isSelectionOpen: false });
    }
    private onHideOverviewMap() {
        this.setState({ isOverviewMapOpen: false });
    }
    render(): JSX.Element {
        const {
            hasTaskPane,
            hasTaskBar,
            hasStatusBar,
            hasNavigator,
            hasSelectionPanel,
            hasLegend,
            hasToolbar
        } = this.props.capabilities;
        let locale = "en";
        if (this.props.config) {
            locale = this.props.config.locale;
        }
        let sbWidth = SIDEBAR_WIDTH;
        let tpWidth = SIDEBAR_WIDTH;
        return <div style={{ width: "100%", height: "100%" }}>
            <ToolbarContainer id="FileMenu" containerClass="aqua-file-menu" containerStyle={{ position: "absolute", left: 0, top: 0, zIndex: 100, right: 0 }} />
            <ToolbarContainer id="Toolbar" containerClass="aqua-toolbar" containerStyle={{ position: "absolute", left: 0, top: (DEFAULT_TOOLBAR_SIZE - 2), zIndex: 100, right: 0 }} />
            <ToolbarContainer id="ToolbarVertical" containerClass="aqua-toolbar-vertical" vertical={true} containerStyle={{ position: "absolute", left: 0, top: ((DEFAULT_TOOLBAR_SIZE * 2) - 1), zIndex: 100, bottom: 0 }} />
            {(() => {
                if (hasSelectionPanel) {
                    return <ModalDialog 
                                size={[SIDEBAR_WIDTH, SELECTION_DIALOG_HEIGHT]}
                                position={[ 40, 500, null, null ]}
                                title={tr("TPL_TITLE_SELECTION_PANEL", locale)}
                                backdrop={false}
                                isOpen={this.state.isSelectionOpen}
                                onClose={this.fnHideSelection}>
                        <PlaceholderComponent locale={locale} id={DefaultComponentNames.SelectionPanel} componentProps={{ maxHeight: SELECTION_DIALOG_HEIGHT - DIALOG_HEADER_HEIGHT }} />
                    </ModalDialog>;
                }
            })()}
            {(() => {
                if (hasLegend) {
                    return <ModalDialog 
                                size={[SIDEBAR_WIDTH, LEGEND_DIALOG_HEIGHT]}
                                position={[ 40, 70, null, null ]}
                                title={tr("TPL_TITLE_LEGEND", locale)}
                                backdrop={false}
                                isOpen={this.state.isLegendOpen}
                                onClose={this.fnHideLegend}>
                        <PlaceholderComponent locale={locale} id={DefaultComponentNames.Legend} componentProps={{ maxHeight: LEGEND_DIALOG_HEIGHT - DIALOG_HEADER_HEIGHT }} />
                    </ModalDialog>;
                }
            })()}
            {(() => {
                if (hasTaskPane) {
                    return <ModalDialog 
                                size={[SIDEBAR_WIDTH, TASK_DIALOG_HEIGHT]}
                                position={[ null, 70, 80, null ]}
                                title={tr("TPL_TITLE_TASKPANE", locale)}
                                backdrop={false}
                                isOpen={this.state.isTaskPaneOpen}
                                onClose={this.fnHideTaskPane}>
                        <PlaceholderComponent locale={locale} id={DefaultComponentNames.TaskPane} componentProps={{ maxHeight: TASK_DIALOG_HEIGHT - DIALOG_HEADER_HEIGHT }} />
                    </ModalDialog>;
                }
            })()}
            {(() => {
                let left = DEFAULT_TOOLBAR_SIZE;
                let right = 0;
                /*
                if (hasLegend || hasSelectionPanel) {
                    left = sbWidth;
                }
                if (hasTaskPane) {
                    right = tpWidth;
                }*/
                return <div style={{ position: "absolute", left: left, top: (DEFAULT_TOOLBAR_SIZE * 2), bottom: 0, right: right }}>
                    {(() => {
                        //NOTE: We have to delay render this behind an IIFE because otherwise this component may be mounted with
                        //sidebar elements not being ready, which may result in a distorted OL map when it mounts, requiring a updateSize()
                        //call to fix
                        if (this.props.map != null) {
                            return <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} />;
                        }
                    })()}
                    {(() => {
                        if (hasNavigator) {
                            return <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={locale} componentProps={NAVIGATOR_PROPS} />;
                        }
                    })()}
                    {(() => {
                        if (hasStatusBar) {
                            return <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} locale={locale} componentProps={MOUSE_COORDINATE_PROPS} />;
                        }
                    })()}
                    {(() => {
                        if (hasStatusBar) {
                            return <PlaceholderComponent id={DefaultComponentNames.ScaleDisplay} locale={locale} componentProps={SCALE_DISPLAY_PROPS} />;
                        }
                    })()}
                    {(() => {
                        if (hasStatusBar) {
                            return <PlaceholderComponent id={DefaultComponentNames.SelectedFeatureCount} locale={locale} componentProps={SELECTED_FEATURE_COUNT_PROPS} />;
                        }
                    })()}
                    <PlaceholderComponent id={DefaultComponentNames.PoweredByMapGuide} locale={locale} componentProps={PBMG_PROPS} />
                </div>
            })()}
            <AjaxViewerShim />
            <ModalLauncher />
        </div>;
    }
}