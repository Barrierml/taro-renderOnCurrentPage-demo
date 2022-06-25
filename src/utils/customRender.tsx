import { getCurrentPages } from '@tarojs/taro';
import type { Page } from '@tarojs/taro';
import type { ComponentType, ReactNode } from 'react'
import { Component } from 'react';


type CustomPage = Page & {
    __withReactiveRenderData?: {
        refresh: () => void;
        waitForRenderComponent: ReactNode;
    };
}

const getCurrentPage = (): CustomPage => {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
};


export const withReactiveRender = (PageComponent: ComponentType) => {

    return class extends Component {
        /** 当前页面实例 */
        private currentPage: CustomPage;

        constructor(props) {
            super(props);
            const currentPage = getCurrentPage();
            // 将数据绑定在当前页面上
            currentPage.__withReactiveRenderData = {
                refresh: () => this.setState({}),
                waitForRenderComponent: false,
            };
            this.currentPage = currentPage;
        }

        componentWillUnmount() {
            // 当页面组件卸载时，清除绑定
            this.currentPage && delete this.currentPage.__withReactiveRenderData;
        }

        render(): ReactNode {
            return (
                <>
                    <PageComponent {...this.props} />
                    {this.currentPage.__withReactiveRenderData?.waitForRenderComponent}
                </>
            );
        };
    };
};

/** 在当前页面渲染组件 */
export const renderComponentOnCurrentPage = (component: ReactNode) => {
    const currentPage = getCurrentPage();
    if (!currentPage.__withReactiveRenderData) return;
    currentPage.__withReactiveRenderData.waitForRenderComponent = component;
    currentPage.__withReactiveRenderData.refresh();
};