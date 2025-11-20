"use client";
import { Icon, IconProps } from "@iconify/react";

const IconifyIcon = ({ icon, ...rest }: IconProps) => {
    return <Icon icon={icon} height={"1em"} fontSize="1.25rem" {...rest} />;
};

export default IconifyIcon;
