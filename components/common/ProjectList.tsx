'use client';
import { useRouter } from "next/navigation";
import TooltipCommon from "./TooltipCommon";
import { formatNumberShort, formatPercent } from "@/lib/format";
import Image from "next/image";
import _map from 'lodash/map';
import { useMe } from "@/hooks/useAuth";
import { useAddUserActivityLog } from "@/hooks/useUserActivityLog";

const ProjectList = ({ title, tooltip, data, valueKey, valueSuffix, isLoading, hasIcon }: any) => {
    const router = useRouter();
    const { data: userData } = useMe()
    const { mutate: addLog } = useAddUserActivityLog();
    return (
        <div className="bg-white dark:bg-black rounded-xl shadow-xl">
            <div className="flex items-center gap-2 dark:text-white px-5 pt-5 pb-3">
                <h3 className="font-reddit">{title}</h3>
                <TooltipCommon content={tooltip} />
            </div>
            <div className="text-[#4B4A4A] dark:text-white pb-3">
                {isLoading ? (
                    <div className="px-5">
                        {[...Array(5)].map((_, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between py-2 animate-pulse"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 bg-gray-200 dark:bg-[#333] rounded animate-pulse rounded" />
                                    <div className="w-8 h-8 bg-gray-200 dark:bg-[#333] rounded animate-pulse rounded-full" />
                                    <div className="h-4 w-30 bg-gray-200 dark:bg-[#333] rounded animate-pulse rounded" />
                                </div>
                                <div className="h-4 w-14 bg-gray-200 dark:bg-[#333] rounded animate-pulse rounded" />
                            </div>
                        ))}
                    </div>
                ) : (
                    _map(data, (project, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between cursor-pointer px-5 py-2 hover:bg-[#F9F9F9] dark:hover:bg-[#1A1A1A] rounded-lg transition"
                            onClick={() => {
                                router.push(`/cryptocurrencies/${project.name}`)
                                if (userData?.data?.id) {
                                    addLog({
                                        userId: userData?.data?.id,
                                        type: 'view_detail',
                                        assetType: 'cryptocurrencies',
                                        assetSymbol: project.name,
                                        assetName: project.name_desc,
                                        assetLogo: project.medium_logo_url,
                                        content: `See details: '${project.name_desc} (${project.name}) Community'`,
                                    });
                                }
                            }}
                        >
                            <div className="flex items-center gap-3 font-noto">
                                <span className="text-xs font-medium w-4">{project?.rank}</span>
                                <div className="w-8 h-8 flex items-center justify-center text-sm">
                                    {hasIcon ? project?.medium_logo_url : <Image src={project?.medium_logo_url ?? '/images/icon-section-6_2.png'} alt="Symbol" width={64} height={64} className="rounded-full" />}
                                </div>
                                <span className="text-sm font-medium">{project?.name_desc}</span>
                            </div>
                            <span className="text-sm font-medium text-[#00B552]">
                                {valueSuffix === '%'
                                    ? <strong>{formatPercent(project?.[valueKey])}</strong>
                                    :
                                    <>
                                        <strong>{formatNumberShort(project?.[valueKey])}</strong>{valueSuffix}
                                    </>
                                }
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProjectList;