// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    setupFAQ();
    setupCTAButtons();
    setupScrollAnimations();
    setupMobileOptimizations();
    setupLinkedInFeatures();
    setupCertificatePreview();
}

// FAQ Accordion - Improved performance
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
    
    // Open first FAQ by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
}

// CTA Button functionality
function setupCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handleCTAClick(this);
        });
    });
}

function handleCTAClick(button) {
    // Add click animation
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
    
    // Track analytics
    trackEvent('cta_click', {
        button_text: button.textContent.trim(),
        button_location: getButtonLocation(button)
    });
    
    // Show processing state
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;
    
    // Simulate redirect (in production, this would go to checkout)
    setTimeout(() => {
        // alert('Redirecting to secure payment...\n\nPrice: ₹300\nAssessment: Python Skill Test\nDuration: 60 minutes');
        
        // In production:
        window.location.href = '/checkout?product=python-assessment';
        
        // Reset button (only needed for demo)
        button.textContent = originalText;
        button.disabled = false;
    }, 1000);
}

function getButtonLocation(button) {
    const section = button.closest('section');
    return section ? section.className.split(' ')[0] : 'unknown';
}

// Scroll Animations - Optimized for mobile
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all major sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
}

// Mobile-specific optimizations
function setupMobileOptimizations() {
    // Detect mobile device
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // Disable hover effects on mobile
        document.body.classList.add('mobile-device');
        
        // Add touch feedback
        addTouchFeedback();
        
        // Optimize viewport height for mobile browsers
        fixMobileViewport();
    }
    
    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const nowMobile = window.innerWidth < 768;
            if (nowMobile !== isMobile) {
                location.reload(); // Reload on device change for optimal experience
            }
        }, 250);
    });
}

function addTouchFeedback() {
    const interactiveElements = document.querySelectorAll('.pain-card, .benefit-card, .topic-card, .guarantee-card, .testimonial-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

function fixMobileViewport() {
    // Fix for mobile browser address bar height
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
}

// LinkedIn Features
function setupLinkedInFeatures() {
    // Simulate LinkedIn post preview animation
    const linkedinPost = document.querySelector('.linkedin-post');
    
    if (linkedinPost) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        linkedinPost.classList.add('animate-in');
                    }, 300);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(linkedinPost);
    }
    
    // Add LinkedIn sharing functionality (placeholder)
    setupLinkedInSharing();
}

function setupLinkedInSharing() {
    // This would be called after assessment completion
    // Placeholder for LinkedIn sharing integration
    
    window.shareOnLinkedIn = function(certificateData) {
        const shareText = `🎯 Excited to share that I've completed the Python Skill Assessment by HackerBeen!

Score: ${certificateData.score}/100 ✅

#Python #Programming #SkillDevelopment #CareerGrowth`;
        
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certificateData.certificateUrl)}`;
        
        // Open LinkedIn share dialog
        window.open(linkedInUrl, '_blank', 'width=600,height=600');
        
        trackEvent('linkedin_share', {
            score: certificateData.score
        });
    };
}

// Certificate Preview Interactions
function setupCertificatePreview() {
    const certificateFrame = document.querySelector('.certificate-frame');
    
    if (certificateFrame) {
        // Add subtle floating animation
        let position = 0;
        const animate = () => {
            position += 0.02;
            certificateFrame.style.transform = `translateY(${Math.sin(position) * 5}px)`;
            requestAnimationFrame(animate);
        };
        
        // Only animate on desktop to save battery on mobile
        if (window.innerWidth >= 768) {
            animate();
        }
        
        // Add click to preview functionality
        certificateFrame.addEventListener('click', function() {
            showCertificateModal();
        });
    }
}

function showCertificateModal() {
    // Placeholder for certificate preview modal
    alert('Certificate preview feature\n\nIn production, this would show:\n- Full-size certificate\n- Download PDF option\n- LinkedIn share button\n- Copy shareable link');
    
    trackEvent('certificate_preview_clicked');
}

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    console.log('Analytics Event:', eventName, eventData);
    
    // In production, integrate with your analytics:
    // gtag('event', eventName, eventData);
    // or
    // analytics.track(eventName, eventData);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add visible class for animations
const style = document.createElement('style');
style.textContent = `
    section.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .linkedin-post.animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .mobile-device * {
        -webkit-tap-highlight-color: rgba(0, 245, 255, 0.2);
    }
`;
document.head.appendChild(style);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            console.log('Page Load Time:', pageLoadTime + 'ms');
            
            trackEvent('page_performance', {
                load_time: pageLoadTime,
                device: window.innerWidth < 768 ? 'mobile' : 'desktop'
            });
        }, 0);
    });
}

// Lazy load images (if any are added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add testimonial rotation for mobile (swipe effect)
function setupTestimonialRotation() {
    const testimonialContainer = document.querySelector('.testimonials');
    
    if (testimonialContainer && window.innerWidth < 768) {
        let startX = 0;
        let currentX = 0;
        
        testimonialContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        testimonialContainer.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX;
        });
        
        testimonialContainer.addEventListener('touchend', () => {
            const diff = startX - currentX;
            
            if (Math.abs(diff) > 50) {
                // Swipe detected
                trackEvent('testimonial_swipe', {
                    direction: diff > 0 ? 'left' : 'right'
                });
            }
        });
    }
}

setupTestimonialRotation();

// Add stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalText = target.textContent;
                
                // Only animate numbers
                if (/\d/.test(finalText)) {
                    animateValue(target, finalText);
                }
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateValue(element, finalText) {
    // Extract number from text
    const match = finalText.match(/[\d,]+/);
    if (!match) return;
    
    const finalNumber = parseInt(match[0].replace(/,/g, ''));
    const duration = 1000;
    const steps = 30;
    const increment = finalNumber / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalNumber) {
            element.textContent = finalText;
            clearInterval(timer);
        } else {
            const formattedNumber = Math.floor(current).toLocaleString();
            element.textContent = finalText.replace(/[\d,]+/, formattedNumber);
        }
    }, duration / steps);
}

animateStats();

// Prevent form submission if any forms are added
document.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Form submission prevented');
});

console.log('HackerBeen Landing Page - Mobile-First Edition Loaded ✅');