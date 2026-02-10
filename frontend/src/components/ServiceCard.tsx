import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  image?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, image }) => {
  return (
    <Card className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-border/50">
      <CardHeader className="text-center">
        {image && (
          <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="text-4xl mb-4">{icon}</div>
        <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;