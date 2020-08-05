// https://reactnavigation.org/docs/navigating-without-navigation-prop/
import * as React from "react";

export const navigationRef = React.createRef() as any;

export function navigate(name: string, params?: { [key: string]: any }) {
  navigationRef.current?.navigate(name, params);
}
