# ContactSection Component

A reusable, pre-footer contact section component that introduces visitors to Andrés's AI assistant and encourages initial client engagement through AI-powered conversations.

## Features

- ✨ **AI-First Messaging**: Communicates the value of starting conversations with an AI assistant
- 🎨 **Design System Integration**: Fully styled with Tailwind CSS matching the existing NYC-themed design
- 🎬 **Smooth Animations**: Uses Framer Motion for elegant scroll-triggered animations
- 📱 **Fully Responsive**: Mobile-first design that works on all screen sizes
- 🔧 **Highly Customizable**: Props for heading, CTA text, and callback functions
- ♿ **Accessible**: Built with semantic HTML and ARIA-compliant patterns

## Usage

### Basic Usage

```tsx
import ContactSection from '@/components/sections/ContactSection';

export default function Page() {
  return (
    <>
      {/* Your other content */}
      <ContactSection />
      <Footer />
    </>
  );
}
```

### With Custom Props

```tsx
import ContactSection from '@/components/sections/ContactSection';

export default function Page() {
  const handleConversationStart = () => {
    // Your custom logic here
    console.log('User wants to start conversation');
    // e.g., open modal, navigate to chat page, etc.
  };

  return (
    <ContactSection
      heading="Ready to Transform Your Business?"
      subheading="AI-Enhanced Consulting"
      ctaText="Let's Talk"
      onStartConversation={handleConversationStart}
      className="bg-gradient-to-b from-black to-slate-900"
    />
  );
}
```

### With Different Pages

You can use this component on any page in your Next.js application:

```tsx
// app/about/page.tsx
import ContactSection from '@/components/sections/ContactSection';

export default function AboutPage() {
  return (
    <main>
      <h1>About Us</h1>
      <ContactSection heading="Want to Learn More?" />
    </main>
  );
}
```

```tsx
// app/services/page.tsx
import ContactSection from '@/components/sections/ContactSection';

export default function ServicesPage() {
  return (
    <main>
      <h1>Our Services</h1>
      {/* Services content */}
      <ContactSection
        heading="Ready to Get Started?"
        subheading="Let's Discuss Your Project"
      />
    </main>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `string` | `"Let's Start a Conversation"` | Main heading text |
| `subheading` | `string` | `"AI-Powered Client Engagement"` | Subheading text below the main heading |
| `ctaText` | `string` | `"Start Conversation with AI Assistant"` | Text for the main CTA button |
| `onStartConversation` | `() => void` | Scrolls to `#ai-chat` | Callback when CTA button is clicked |
| `className` | `string` | `''` | Additional CSS classes for the section wrapper |

## Component Structure

The ContactSection includes:

1. **Header Section**
   - Main heading (customizable)
   - Subheading (customizable)

2. **Introduction Card**
   - Explanation of why Andrés uses an AI assistant
   - Value proposition for clients

3. **Benefits Grid**
   - Immediate Response
   - World-Class Advisory
   - Better Preparation

4. **How It Works**
   - Step-by-step process explanation
   - Clear numbered list

5. **Value Proposition Quote**
   - Personal quote from Andrés
   - Styled with accent border

6. **Call-to-Action**
   - Large, prominent button
   - Hover animations
   - Icon integration

7. **Alternative Contact Methods**
   - Email and LinkedIn buttons
   - For users who prefer traditional contact

## Styling

The component uses the existing design system:

- **Colors**: NYC-themed palette (nyc-broadway for accents)
- **Backgrounds**: Slate-900 with opacity for glassmorphism effect
- **Borders**: White with 10% opacity
- **Typography**: Light font weights (300-400) for elegance
- **Shadows**: Deep shadows for elevation
- **Animations**: Smooth Framer Motion transitions

### Customizing Colors

You can override colors using the `className` prop:

```tsx
<ContactSection
  className="[&_.text-nyc-broadway]:text-blue-500"
/>
```

## Animation Details

The component uses Framer Motion with the following animations:

- **Header**: Fade in from bottom (0.6s duration)
- **Main Card**: Fade in from bottom with delay (0.7s duration, 0.2s delay)
- **Benefits Grid**: Staggered fade in (0.5s duration, 0.3-0.5s delay)
- **CTA Button**: Fade in from bottom (0.6s duration, 0.6s delay)
- **Alternative Methods**: Fade in (0.8s duration, 0.8s delay)

All animations use `whileInView` with `once: true` for performance.

## Accessibility

- Semantic HTML structure (`<section>`, `<h2>`, `<h3>`, etc.)
- Proper heading hierarchy
- ARIA-compliant buttons from shadcn/ui
- Keyboard navigation support
- Screen reader friendly

## Dependencies

This component requires:

- `framer-motion` (v12.23.24+)
- `lucide-react` (v0.554.0+)
- `@/components/ui/button` (shadcn/ui)
- `@/components/ui/card` (shadcn/ui)
- Tailwind CSS with the project's custom theme

## Integration with AI Chat

The default behavior scrolls to an element with `id="ai-chat"`. Make sure your AI chat section has this ID:

```tsx
<section id="ai-chat">
  {/* Your AI chat component */}
</section>
```

Or provide a custom `onStartConversation` callback:

```tsx
<ContactSection
  onStartConversation={() => {
    // Open modal
    setShowChatModal(true);

    // Or navigate
    router.push('/chat');

    // Or trigger analytics
    trackEvent('conversation_started');
  }}
/>
```

## Best Practices

1. **Placement**: Use as a pre-footer section on landing pages
2. **Spacing**: Ensure adequate padding above and below (built-in: `py-20`)
3. **Context**: Works best after showcasing services or expertise
4. **Mobile**: Test on mobile devices to ensure readability
5. **Performance**: Component uses `whileInView` to only animate when visible

## Examples in Codebase

See `app/page.tsx` for the default implementation:

```tsx
<ContactSection
  onStartConversation={() => {
    const aiChatSection = document.getElementById('ai-chat');
    if (aiChatSection) {
      aiChatSection.scrollIntoView({ behavior: 'smooth' });
    }
  }}
/>
```

## Troubleshooting

### CTA button not working
- Ensure you have an element with `id="ai-chat"` or provide a custom `onStartConversation` callback

### Animations not showing
- Check that `framer-motion` is installed: `npm install framer-motion`
- Ensure you're not disabling animations globally

### Styling looks different
- Verify Tailwind CSS is properly configured
- Check that custom color variables (like `nyc-broadway`) are defined in `globals.css`

### TypeScript errors
- Make sure all dependencies are up to date
- Check that shadcn/ui components are properly installed

## Contributing

When modifying this component:

1. Maintain TypeScript types for all props
2. Keep animations consistent with other sections
3. Test on mobile and desktop
4. Ensure accessibility standards are met
5. Update this README with any new props or features

## License

Part of the AC-portfolio project.
