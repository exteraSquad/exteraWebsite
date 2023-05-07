import {useTranslations} from "next-intl";
import Link from "@/app/[locale]/_components/localised-link";
import IconCanvas from "@/app/[locale]/_components/icon-canvas";
import {default as team} from "@/data/team.json";
import Image from "next/image";
import DragSlider from "@/app/[locale]/_components/drag-slider";
import DownloadButton from "@/app/[locale]/(composited)/(home)/_components/download-button";
import TeamMember from "@/app/[locale]/(composited)/(home)/_components/team-member";
import FeaturesOverview from "@/app/[locale]/(composited)/(home)/_components/features-overview";
import Phone from "@/app/[locale]/(composited)/(home)/_components/phone";
import {SquareArrowDown} from "solar-icon-set";
import {checkedIcons} from "@/loaders/icons";
import Button from "@/app/[locale]/_components/button";
import {default as features} from "@/data/features.json";
import {default as moreFeatures} from "@/data/more.json";
import Marquee from "@/app/[locale]/_components/marquee";

export default function Home() {
    const t = useTranslations('home');

    return (
        <>
            <IconCanvas probability={0.02} paths={checkedIcons} color="#F54142" height={1700}/>

            <section className="w-full flex justify-center items-center flex-col gap-4 mt-32 md:mt-48 mb-16" id="top">
                <h1 className="text-primary-500 font-bold font-display text-5xl md:text-6xl lg:text-7xl">{t("title")}</h1>
                <p className="text-xl md:text-2xl text-neutral-800 w-full md:w-[30rem] text-center">{t("description")}</p>
                <Link
                    href="#download"
                    className="md:hidden"
                >
                    <Button>
                        {t('more.download')}
                    </Button>
                </Link>
                <Phone />
            </section>

            <section
                className="w-full bg-black text-white justify-between flex lg:px-24 lg:py-36 lg:gap-4 mb-16 flex-col
                lg:flex-row rounded-4xl lg:rounded-6xl lg:h-[28rem] mt-64 sm:p-12 sm:pt-16 gap-16 p-4 pt-12"
                id="features"
            >
                <div className="flex flex-col gap-4">
                    <h3 className="font-bold font-display text-5xl lg:text-6xl 2xl:text-8xl text-center lg:text-left">
                        {t("features.title")}
                    </h3>
                    <p className="text-lg md:text-xl xl:text-2xl w-full lg:max-w-lg text-center lg:text-left">
                        {t("features.description")}
                    </p>
                </div>

                <FeaturesOverview
                    features={[
                        ...features.map(({id, img}) => ({
                            name: t("features." + id),
                            content: (
                                <div className="flex items-end justify-center w-full h-full">
                                    <Image
                                        src={img.src} width={img.width} height={img.height} alt={t("features." + id)}
                                        className="object-contain max-h-full"
                                    />
                                </div>
                            )
                        })),
                        {
                            name: t("features.more"),
                            content: (
                                <div className="flex flex-col items-center gap-8 justify-center w-full h-full">
                                    <Link
                                        href="#more"
                                        role="button"
                                        className="w-32 h-32 aspect-square hover:bg-primary-500 flex-col hover:text-primary-50
                                        rounded-full bg-white text-primary-500 flex justify-center items-center
                                        transition-colors active:bg-primary-400 active:text-primary-50"
                                    >
                                        <SquareArrowDown size={60} iconStyle="Bold" />
                                    </Link>
                                    <p className="text-neutral-500 text-xl font-medium">{t("features.button")}</p>
                                </div>
                            )
                        },
                    ]}
                    className="lg:w-[32rem] h-fit md:h-[36rem] lg:-translate-y-96 rounded-3xl bg-primary-100 text-black"
                    leftOffset={24}
                />
            </section>

            <section
                className="w-full flex justify-center items-center flex-col gap-24 mb-16 border-2 py-12 px-4 md:px-12 lg:p-20 border-neutral-100
                rounded-6xl bg-white"
                id="more"
            >
                {moreFeatures.map(({img, id, note}, i) => (
                    <figure
                        className={"flex w-full justify-between gap-24 items-center flex-col-reverse " +
                            (i % 2 ? 'md:flex-row-reverse' : 'md:flex-row')}
                        key={i}
                    >
                        <Image
                            src={img.src}
                            alt={t("more." + id + ".alt")}
                            width={img.width}
                            height={img.height}
                            className="w-full md:w-5/12 h-auto"
                        />
                        <figcaption
                            className="flex flex-col justify-center gap-1 text-center md:text-left md:w-7/12 h-fit">
                            {note &&
                                <p className="text-neutral-400 text-lg">
                                    {t("more." + id + ".note")}
                                </p>
                            }
                            <h3 className="font-bold font-display text-4xl lg:text-7xl">
                                {t("more." + id + ".title")}
                            </h3>
                            <p className="text-neutral-800 text-lg md:text-xl xl:text-2xl mt-4 md:mt-6">
                                {t("more." + id + ".description")}
                            </p>
                        </figcaption>
                    </figure>
                ))}
                <figure className="flex flex-col gap-4 lg:gap-6 items-center">
                    <h3 className="font-bold font-display text-4xl lg:text-7xl text-center">
                        {t("more.title")}
                    </h3>
                    <p className="text-lg md:text-xl xl:text-2xl text-neutral-800 w-full max-w-lg text-center">
                        {t("more.description")}
                    </p>
                    <Link
                        href="#download"
                    >
                        <Button>
                            {t('more.download')}
                        </Button>
                    </Link>
                </figure>
            </section>

            <div className="overflow-hidden w-full my-8 md:my-16 flex flex-col justify-center h-96 sm:h-[32rem] md:h-[48rem] word-spacing-6 text-6xl sm:text-8xl md:text-9xl font-bold font-display">
                <Marquee rotation={8} className="text-neutral-300" enableScrollBoost>
                    Handy Beautiful Open Fast Modern
                </Marquee>
                <Marquee rotation={8} baseVelocity={-1} className="text-white text-outline-neutral-300" enableScrollBoost>
                    Handy Beautiful Open Fast Modern
                </Marquee>
            </div>

            <section className="w-full flex justify-center items-center flex-col gap-16 mb-32">
                <h2 id="team" className="font-display font-bold text-5xl lg:text-7xl text-center">{t("team.title")}</h2>
                <DragSlider buttonHeight={{
                    top: 410,
                    bottom: 495
                }}>
                    {
                        team.map((member, i) => (
                            <TeamMember
                                key={i}
                                buttonText={t("team.contact")}
                                {...member}
                            />
                        ))
                    }
                </DragSlider>
            </section>

            <section className="w-full flex justify-center items-center flex-col gap-16" id="download">
                <h2 className="font-display font-bold text-5xl lg:text-7xl text-center">{t("download.title")}</h2>
                <div className="flex flex-row flex-wrap gap-8 justify-center w-full">
                    <DownloadButton name="RuStore" eyebrow={t("download.store")} icon={
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M2.95237 39.0479C5.90472 42 10.6565 42 20.16 42H21.84C31.3435 42 36.0953 42 39.0476 39.0479C42 36.0952 42 31.3433 42 21.8398V20.1597C42 10.6562 42 5.9043 39.0476 2.95215C36.0953 0 31.3435 0 21.84 0H20.16C10.6565 0 5.90472 0 2.95236 2.95215C0 5.90479 0 10.6562 0 20.1597V21.8398C0 31.3433 0 36.0952 2.95237 39.0479ZM27.2989 29.1011C27.2989 30.4199 26.0529 31.3867 24.7676 31.0659L21.8797 30.3442C21.5627 30.2314 21.3429 29.9351 21.3313 29.5933L20.9772 19.1479C20.8748 17.7656 19.8486 16.666 18.7762 16.3423C18.7159 16.3242 18.6516 16.3486 18.616 16.4004C18.5798 16.4531 18.5938 16.5259 18.6443 16.5649C18.9091 16.77 19.638 17.439 19.638 18.5928L19.6358 29.7798L19.6388 32.25C19.6388 33.5688 18.3927 34.5361 17.1074 34.2148L8.968 32.1816C7.83639 31.8989 7.04297 30.8867 7.04297 29.7256V16.0483C7.04297 14.7295 8.28899 13.7622 9.57433 14.0835L14.7031 15.3647V12.8989C14.7031 11.5801 15.9492 10.6133 17.2345 10.9341L22.3613 12.2148V9.75C22.3613 8.43115 23.6074 7.46387 24.8927 7.78516L33.0321 9.81836C34.1637 10.1011 34.9572 11.1133 34.9572 12.2744V25.9517C34.9572 27.2705 33.7111 28.2378 32.4258 27.9165L29.5944 27.2095C29.2496 27.1133 29.0056 26.8042 28.9935 26.4448L28.6393 16C28.5369 14.6177 27.5107 13.5181 26.4382 13.1943C26.3781 13.1763 26.3138 13.2007 26.2781 13.2524C26.2419 13.3052 26.2559 13.3779 26.3064 13.417C26.5712 13.6221 27.3001 14.291 27.3001 15.4448L27.2989 29.1011Z"
                                  fill="currentColor"/>
                        </svg>
                    } href="https://apps.rustore.ru/app/com.exteragram.messenger"/>
                    <DownloadButton name="Play Market" eyebrow={t("download.unavailable")} icon={
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M6.09616 2.60503C7.43575 4.03669 12.0665 8.39175 16.3868 12.2813L24.2404 19.3525L27.2141 16.3911L30.1867 13.4296L18.0821 6.7148C11.4254 3.02151 5.45701 0 4.81887 0C4.18174 0 4.75556 1.17236 6.09616 2.60503ZM2 21.0244V40.1857L12.0494 30.8879C17.5766 25.773 22.0989 21.3348 22.0989 21.0244C22.0989 20.7141 17.5766 16.2759 12.0494 11.161L2 1.86317V21.0244ZM28.6099 18.043L25.6996 21.0695L28.9416 24.2992L32.1835 27.529L35.935 25.5277C41.0954 22.7755 41.3466 19.9011 36.6656 17.1499C32.0579 14.4408 32.076 14.4388 28.6099 18.043ZM13.5569 32.4948C8.02967 37.6948 4.13249 41.9728 4.89625 41.9998C5.66101 42.0268 11.6756 39.0564 18.263 35.3981L30.24 28.7474L27.4884 25.8871C25.976 24.3143 24.4836 23.0298 24.1721 23.0328C23.8606 23.0368 19.0841 27.2937 13.5569 32.4948Z"
                                  fill="currentColor"/>
                        </svg>
                    } disabled/>
                    <DownloadButton name="APK File" eyebrow={t("download.file")} icon={
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18.1035 30.2083C18.1035 31.3359 17.4552 32.25 16.6556 32.25C15.8559 32.25 15.2076 31.3359 15.2076 30.2083C15.2076 29.0807 15.8559 28.1666 16.6556 28.1666C17.4552 28.1666 18.1035 29.0807 18.1035 30.2083Z"
                                fill="currentColor"/>
                            <path
                                d="M26.5014 30.2083C26.5014 31.3359 25.8532 32.25 25.0535 32.25C24.2539 32.25 23.6056 31.3359 23.6056 30.2083C23.6056 29.0807 24.2539 28.1666 25.0535 28.1666C25.8532 28.1666 26.5014 29.0807 26.5014 30.2083Z"
                                fill="currentColor"/>
                            <path
                                d="M27.7859 4.31288L35.7034 11.795C38.1368 14.0944 39.4351 15.3214 40.1602 16.8002H33C28.286 16.8002 25.9289 16.8002 24.4645 15.2625C23 13.7248 23 11.25 23 6.30022L23.0184 0.557813C24.4023 1.1154 25.5302 2.18123 27.7859 4.31288Z"
                                fill="currentColor"/>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M25 42H17C9.45753 42 5.68629 42 3.34315 39.5397C1 37.0794 1 33.1196 1 25.2V16.8C1 8.8804 1 4.92061 3.34315 2.4603C5.68629 0 9.47739 0 17.0596 0C18.2716 0 19.2428 0 20.06 0.0349885C20.0331 0.202845 20.019 0.374068 20.0185 0.547188L20 6.49943C19.9998 8.80335 19.9997 10.8394 20.2098 12.4806C20.4376 14.2596 20.9606 16.0383 22.3431 17.4899C23.7257 18.9416 25.4197 19.4907 27.1139 19.7299C28.6769 19.9506 30.6161 19.9504 32.8103 19.9502L40.9148 19.9502C41 21.0722 41 22.4492 41 24.2821V25.2C41 33.1196 41 37.0794 38.6569 39.5397C36.3137 42 32.5425 42 25 42ZM11.0097 22.589C11.5092 22.1865 12.2381 22.2681 12.6378 22.7712L14.0705 24.575C15.8779 23.5547 18.1539 22.9167 21 22.9167C24.2699 22.9167 26.7873 23.7588 28.7062 25.0555L30.5206 22.7712C30.9202 22.2681 31.6491 22.1865 32.1487 22.589C32.6482 22.9915 32.7292 23.7257 32.3296 24.2288L30.488 26.5473C32.6425 28.7601 33.7062 31.6141 34.1144 34.0127C34.3306 35.2829 33.2837 36.3333 32.0042 36.3333H9.99576C8.7163 36.3333 7.6694 36.2829 7.88558 35.0127C8.33356 32.3807 9.5707 28.2003 12.1724 25.9205L10.8288 24.2288C10.4291 23.7257 10.5101 22.9915 11.0097 22.589Z"
                                  fill="currentColor"/>
                        </svg>
                    } href="https://t.me/exteraReleases"/>
                    <DownloadButton name="Telegram" eyebrow={t("download.link")} icon={
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M42 21C42 32.598 32.598 42 21 42C9.40202 42 0 32.598 0 21C0 9.40202 9.40202 0 21 0C32.598 0 42 9.40202 42 21ZM21.7525 15.5031C19.71 16.3527 15.6277 18.1111 9.50579 20.7783C8.51169 21.1736 7.99093 21.5604 7.94352 21.9385C7.86341 22.5776 8.66373 22.8293 9.75356 23.172C9.9018 23.2186 10.0554 23.2669 10.2129 23.3181C11.2851 23.6666 12.7274 24.0744 13.4772 24.0906C14.1574 24.1053 14.9165 23.8249 15.7546 23.2494C21.4745 19.3883 24.4271 17.4367 24.6125 17.3946C24.7433 17.3649 24.9245 17.3276 25.0473 17.4367C25.1701 17.5459 25.158 17.7526 25.145 17.808C25.0658 18.146 21.9242 21.0667 20.2984 22.5781C19.7916 23.0493 19.4321 23.3835 19.3586 23.4599C19.194 23.6309 19.0262 23.7926 18.8649 23.9481C17.8688 24.9083 17.1218 25.6285 18.9063 26.8044C19.7638 27.3695 20.45 27.8368 21.1346 28.303C21.8823 28.8122 22.628 29.32 23.5928 29.9524C23.8386 30.1136 24.0734 30.2809 24.302 30.4439C25.1721 31.0642 25.9538 31.6215 26.9195 31.5326C27.4807 31.481 28.0603 30.9533 28.3547 29.3796C29.0504 25.6605 30.4178 17.6023 30.7339 14.2817C30.7615 13.9908 30.7267 13.6185 30.6987 13.455C30.6708 13.2916 30.6123 13.0587 30.3999 12.8863C30.1483 12.6821 29.7598 12.6391 29.5861 12.6421C28.7963 12.6561 27.5844 13.0774 21.7525 15.5031Z"
                                  fill="currentColor"/>
                        </svg>
                    } href="https://t.me/exteraGram"/>
                </div>
            </section>
        </>
    )
}
