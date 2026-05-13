import { useState, useEffect } from 'react';
import { Joyride, STATUS, Step } from 'react-joyride';

export default function OnboardingTour() {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const isDone = localStorage.getItem('nalar_onboarding_done');
    if (!isDone) {
      setRun(true);
    }
  }, []);

  const handleJoyrideEvent = (data: any) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
      localStorage.setItem('nalar_onboarding_done', 'true');
    }
  };

  const steps: Step[] = [
    {
      target: '#tour-sidebar',
      content: 'Ini adalah pusat navigasi NALAR. Akses Sumber, Kutipan, Peta Argumen, dan lainnya.',
      skipBeacon: true,
    },
    {
      target: '#tour-editor',
      content: 'Di sini Anda menulis draf skripsi. NALAR tidak akan menuliskan konten untuk Anda — hanya membantu.',
    },
    {
      target: '#tour-insights',
      content: 'Pantau progres menulis, lihat saran kutipan, dan buka Audit Integritas saat siap.',
    },
    {
      target: '#tour-ai-insight',
      content: 'Asisten AI hanya memberikan saran, bukan menulis. Anda tetap pemegang kendali penuh riset.',
    }
  ];

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      scrollToFirstStep
      onEvent={handleJoyrideEvent}
      options={{
        showProgress: true,
        buttons: ['back', 'primary', 'skip'],
        arrowColor: '#ffffff',
        backgroundColor: '#ffffff',
        overlayColor: 'rgba(0, 0, 0, 0.4)',
        primaryColor: '#171717',
        textColor: '#171717',
        zIndex: 1000,
      }}
      styles={{
        tooltipContainer: {
          textAlign: 'left',
          fontFamily: '"Inter", sans-serif',
          border: '1px solid #D4AF37',
          borderRadius: '2px',
        },
        buttonPrimary: {
          backgroundColor: '#171717',
          color: '#ffffff',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontSize: '10px',
          fontWeight: 'bold',
          padding: '8px 16px',
          borderRadius: '0',
        },
        buttonBack: {
          marginRight: '8px',
          color: '#171717',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontSize: '10px',
        },
        buttonSkip: {
          color: '#737373',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontSize: '10px',
        },
        tooltipContent: {
          padding: '20px 0',
        }
      }}
      locale={{
        last: 'Mulai Riset',
        skip: 'Lewati',
        next: 'Lanjutkan',
        back: 'Kembali',
      }}
    />
  );
}
