import Joyride from 'react-joyride'
import * as React from 'react'

const steps = [
  {
    target: '#send-file',
    content: <p className="text-sm font-medium">Tekan tombol ini untuk mengirimkan file</p>
  },
  {
    target: '#video-call',
    content: <p className="text-sm font-medium">Tekan tombol ini untuk memulai panggilan video</p>
  },
  {
    target: '#voice-call',
    content: <p className="text-sm font-medium">Tekan tombol ini untuk memulai panggilan suara</p>
  },
  {
    target: '#share',
    content: (
      <p className="text-sm font-medium">
        Tekan tombol ini untuk membagikan tautan forum untuk mengundang pengguna lain bergabung dengan mudah
      </p>
    )
  },
  {
    target: '#search-user',
    content: <p className="text-sm font-medium">Tekan tombol ini untuk mencari pengguna yang ingin diundang ke forum</p>
  },
  {
    target: '#request-member',
    content: (
      <p className="text-sm font-medium">
        Tekan tombol ini untuk melihat daftar pengguna yang meminta bergabung ke forum
      </p>
    )
  },
  {
    target: '#member-role',
    content: <p className="text-sm font-medium">Tekan tombol ini untuk melihat pembagian peran anggota dalam forum</p>
  },
  {
    target: '#search-member',
    content: <p className="text-sm font-medium">Tekan tombol ini untuk mencari anggota forum yang telah terdaftar</p>
  }
]

export default function OnBoardingForum() {
  const [run, setRun] = React.useState(false)

  React.useEffect(() => {
    const onboardingDone = localStorage.getItem('onboarding') === 'true'
    if (!onboardingDone) {
      setRun(true)
    }
  }, [])

  return (
    <Joyride
      scrollToFirstStep
      steps={steps}
      continuous
      disableScrolling
      disableOverlayClose
      hideCloseButton
      showSkipButton
      run={run}
      callback={({ status }) => {
        if (status === 'finished') {
          localStorage.setItem('onboarding', 'true')
          setRun(false)
        }
      }}
      styles={{
        options: {
          primaryColor: '#18181b',
          zIndex: 999999999
        },
        buttonNext: {
          backgroundColor: '#18181b',
          fontSize: 12
        },
        buttonSkip: {
          fontSize: 12
        },
        buttonBack: {
          fontSize: 12,
          borderRadius: 4,
          backgroundColor: '#e4e4e7'
        }
      }}
    />
  )
}
